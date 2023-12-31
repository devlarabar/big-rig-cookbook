const mongoose = require('mongoose')
const { Schema, model, models } = mongoose

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    password: {
        type: String,
    },
    image: {
        type: String,
    },
    admin: Boolean,
    securityQuestions: [{
        type: Object,
        required: true
    }],
    description: {
        type: String,
        required: false,
        maxLength: 200
    }
})

const User = models.User || model("User", UserSchema)

module.exports = User