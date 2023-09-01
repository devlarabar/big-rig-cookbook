const mongoose = require('mongoose')
const { Schema, model } = mongoose

const RecipeSchema = new Schema({
    title: String,
    summary: String,
    directions: [String],
    ingredients: [{
        ingredient: {type: Schema.Types.ObjectId, ref: 'Ingredient'},
        qty: Number,
        measurement: String
    }],
    cookware: Array,
    prepTime: Number,
    cookTime: Number,
    //cover: String,
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    savedBy: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {
    timestamps: true
})

const RecipeModel = model('Recipe', RecipeSchema)

module.exports = RecipeModel