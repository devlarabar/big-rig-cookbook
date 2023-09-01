const Ingredient = require('../models/Ingredient')

module.exports = {
    ingredients: async (req, res) => {
        const items = await Ingredient.find({}).sort({name: 1})
        res.json(items)
    }
}