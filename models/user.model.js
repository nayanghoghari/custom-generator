const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    // Define schema here
})

exports.UserModel = model('users', userSchema, "USER");