
const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({

    userID: {
        type: String,
        required: [true, 'User ID is required']
    },
    name: {
        type: String,
        required: [true, 'name is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },

    spots: {
        type: Number,
        required: [true, 'Spots is required']
    },

    longDesc: {
        type: String,
        required: [true, 'longDesc is required']
    },

    image: {
        type: String,
        required: [true, 'image is required']
    },

    email: {
        type: String,
        required: [true, 'email is required']
    },
    cover: {
        type: String,
        required: [true, 'cover is required']
    },
    tech: {
        type: String,
        required: [true, 'tech is required']
    },
    id: {
        type: String,
        // mongoose.SchemaTypes.ObjectId,
        required: [true, 'id is required'],
        index: true
    }


})

var Project = mongoose.model('proj', projectSchema)

module.exports = Project
