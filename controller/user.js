const { User } = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')

exports.userRegistration = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, haspass) => {
        if (err) {
            res.json({ message: err })
        }
        const newUsers = new User({
            name: req.body.name,
            email: req.body.email,
            password: haspass
        })
        newUsers.save()
            .then((data) => {
                res.status(201).send({
                    message: 'User registration Successfully!',
                    user: data
                })
            }).catch((err) => {
                console.log(err);
                res.send({
                    message: 'Email already exits!'

                })
            })

    })



}



exports.userLoing = (req, res) => {
    var email = req.body.email
    var password = req.body.password
    User.findOne({ email: email })
        .then((userData) => {
            console.log(userData);
            bcrypt.compare(password, userData.password, (err, result) => {

                if (err) {
                    res.send({ error: 'Invalid Password' })
                } else {
                    if (result) {
                        let token = jwt.sign({ id: userData._id }, 'Knovator', { expiresIn: '6h' })
                        res.cookie("user", token)
                        res.json({
                            message: 'Login Successful!',
                            userDetails: userData,
                            Token: token
                        })
                    } else {
                        res.json({
                            message: 'Invalid email or password!'
                        })
                    }
                }
            })

        }).catch((err) => {
            console.log(err);
            res.json({ message: 'User not found' })
        })


}


