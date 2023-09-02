const Recipe = require('../models/Recipe')
const Ingredient = require('../models/Ingredient')

module.exports = {
    search: async (req, res) => {
        const query = req.params.query
        const ingredient = await Ingredient.find({ name: {$regex: query}})
        const recipes = await Recipe.find({ 'ingredients.ingredient': {$in: ingredient}  })
        .sort({timestamp: -1})
        .populate('author', ['username'])
        .populate('ingredients.ingredient', ['name', 'type'])
        res.json(recipes.length > 0 ? recipes : null)
    }
}