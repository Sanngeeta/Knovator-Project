const mongoose=require('mongoose')
const validator=require('validator')
mongoose.mongoose.set('strictQuery', true).connect('mongodb://127.0.0.1:27017/KnovatorDB')
.then(()=>{
    console.log('Connection Succesfully..');
}).catch((err)=>{
    console.log(err);
})

const userSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        required:true,
        unique:[true,'Email id already exits'],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('Email is invalid!')
           }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:[8,'Your password be bhi 8 characters']
        
    }

})


// Create a new collection
const User=new mongoose.model('user',userSchema)

module.exports = { User };