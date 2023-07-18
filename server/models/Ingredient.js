const mongoose = require('mongoose')
const { Schema, model } = mongoose

const IngredientSchema = new Schema({
    name: String,
    type: String
}, {
    timestamps: true
})

const IngredientModel = model('Ingredient', IngredientSchema)

module.exports = IngredientModel