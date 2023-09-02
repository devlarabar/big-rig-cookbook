const User = require('../models/User')
const Recipe = require('../models/Recipe')
const Ingredient = require('../models/Ingredient')
const Achievement = require('../models/Achievement')
const jwt = require('jsonwebtoken')
const secret = 'salkdjfhsk2345rfgd324'
const helpers = require('./recipe.helpers')

module.exports = {
    createRecipeData: async (req, res) => {
        const { id } = req.params
        if (id) {
            const substituteID = '123456789123456789012345'
            const recipeDoc = await Recipe
                .findById(id.length === 24 ? id : substituteID)
                .populate('author', ['username'])
                .populate('ingredients.ingredient', 'name')
            res.json(recipeDoc ? recipeDoc : null)
            console.log('Recipe is being edited...', recipeDoc)
        } else {
            res.json('Not found').status(404)
        }
    },
    createRecipe: async (req, res) => {
        const userId = req.body.user.id
        const { title, directions, ingredients, cookware, prepTime, cookTime } = req.body
        try {
            const recipeDoc = await Recipe.create({
                title,
                directions,
                ingredients,
                cookware,
                prepTime,
                cookTime,
                author: userId,
            })
            await helpers.checkAchievements(userId)
            res.json({ recipeDoc }).status(201)
        } catch (error) {
            console.log(error)
            res.json('Failed to create recipe').status(500)
        }
    },
    editRecipe: async (req, res) => {
        const userId = req.body.user.id
        const { title, directions, ingredients, cookware, prepTime, cookTime, editRecipeId } = req.body
        try {
            const recipeDoc = await Recipe.findById(editRecipeId)
            const isAuthor = JSON.stringify(recipeDoc.author) === JSON.stringify(userId)
            if (!isAuthor) return res.status(400).json('You are not the author of this recipe!')
            else {
                await recipeDoc.updateOne({
                    title,
                    directions,
                    ingredients,
                    cookware,
                    prepTime,
                    cookTime
                })
                await helpers.checkAchievements(userId)
                res.json({ recipeDoc }).status(201)
            }
        } catch (error) {
            console.log(error)
            res.json('Failed to create recipe').status(500)
        }
    },
    deleteRecipe: async (req, res) => {
        const userId = req.user.id
        const recipeId = req.params.id
        const recipeDoc = await Recipe.findById(recipeId)
        const isAuthor = JSON.stringify(recipeDoc.author) === JSON.stringify(userId)
        if (!isAuthor) return res.status(400).json('You are not the author of this recipe!')
        else {
            try {
                await Recipe.findByIdAndDelete(recipeId)
                res.json(`Recipe ${recipeId} deleted.`)
            } catch (err) {
                res.json({ 'error': err }).status(204)
            }
        }
    },
    viewRecipes: async (req, res) => {
        const recipes = await Recipe
            .find()
            .populate('author', ['username'])
            .populate('ingredients.ingredient', ['name', 'type'])
            .sort({ createdAt: -1 })
            .limit(20)
            .lean()
        res.json(recipes)
    },
    viewRecipe: async (req, res) => {
        const { id } = req.params
        const substituteID = '123456789123456789012345'
        const recipeDoc = await Recipe
            .findById(id.length === 24 ? id : substituteID)
            .populate('author', ['username'])
            .populate('ingredients.ingredient', 'name')
        res.json(recipeDoc ? recipeDoc : null)
    },
    saveRecipe: async (req, res) => {
        const recipeId = req.body.recipe
        const userId = req.body.user
        const recipeDoc = await Recipe.findById(recipeId)
        const userDoc = await User.findById(userId)

        if (recipeDoc.savedBy?.includes(userDoc._id)) {
            newSavedRecipes = recipeDoc.savedBy.filter(x => x != String(userDoc._id))
            await recipeDoc.updateOne({
                savedBy: [...newSavedRecipes]
            });
            res.json(`User id ${userId} removed from recipe ${recipeId}.`)
        } else {
            await recipeDoc.updateOne({
                savedBy: [...recipeDoc.savedBy, userDoc]
            }, { upsert: true });
            res.json(`User id ${userId} saved to recipe ${recipeId}.`)
        }
    }
}