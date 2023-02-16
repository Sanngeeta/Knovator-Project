const mongoose = require('mongoose')
const validator = require('validator')

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    active: {
        type: String,
        required: true,
        default: 'inactive'
    },
    geoLocation: {
        type: String,
        required: true
    }
})


// Create a new collection
const Post = new mongoose.model('post', postSchema)
module.exports = { Post };