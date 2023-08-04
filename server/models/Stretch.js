const mongoose = require('mongoose')
const { Schema, model } = mongoose

const StretchSchema = new Schema({
    name: String,
    description: String,
    position: String,
    muscle: String,
    savedBy: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

const StretchModel = model('Stretch', StretchSchema)

module.exports = StretchModel