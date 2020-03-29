const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    userID: {
        type: String,
        required: [true, 'User ID is required']
    }

})

var User = mongoose.model('users', userSchema)

module.exports = User