const Post = require('../models/Post')
const Ingredient = require('../models/Ingredient')

module.exports = {
    search: async (req, res) => {
        const query = req.params.query
        const ingredient = await Ingredient.find({ name: {$regex: query}})
        const posts = await Post.find({ 'ingredients.ingredient': {$in: ingredient}  })
        .sort({timestamp: -1})
        .populate('author', ['username'])
        .populate('ingredients.ingredient', ['name', 'type'])
        res.json(posts.length > 0 ? posts : null)
    }
}