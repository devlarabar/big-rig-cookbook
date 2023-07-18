const mongoose = require('mongoose')
const { Schema, model } = mongoose

const UserSchema = new Schema({
    username: { type: String, required: true, min: 4, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    admin: { type: Boolean, required: true, default: false }
})

const UserModel = model('User', UserSchema)

module.exports = UserModel