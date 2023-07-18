const mongoose = require('mongoose')
const { Schema, model } = mongoose

const IngredientSchema = new Schema({
    name: String,
    type: String,
    author: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
})

const IngredientModel = model('Ingredient', IngredientSchema)

module.exports = IngredientModel