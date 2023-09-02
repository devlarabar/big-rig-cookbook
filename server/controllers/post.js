const User = require('../models/User')
const Post = require('../models/Recipe')
const Ingredient = require('../models/Ingredient')
const Achievement = require('../models/Achievement')
const jwt = require('jsonwebtoken')
const secret = 'salkdjfhsk2345rfgd324'
const helpers = require('./post.helpers')

module.exports = {
    createPostData: async (req, res) => {
        const { id } = req.params
        if (id) {
            const substituteID = '123456789123456789012345'
            const postDoc = await Post
                .findById(id.length === 24 ? id : substituteID)
                .populate('author', ['username'])
                .populate('ingredients.ingredient', 'name')
            res.json(postDoc ? postDoc : null)
            console.log('Recipe is being edited...', postDoc)
        } else {
            res.json('Not found').status(404)
        }
    },
    createPost: async (req, res) => {
        const userId = req.body.user.id
        const { title, directions, ingredients, cookware, prepTime, cookTime } = req.body
        try {
            const postDoc = await Post.create({
                title,
                directions,
                ingredients,
                cookware,
                prepTime,
                cookTime,
                author: userId,
            })
            await helpers.checkAchievements(userId)
            res.json({ postDoc }).status(201)
        } catch (error) {
            console.log(error)
            res.json('Failed to create recipe').status(500)
        }
    },
    editPost: async (req, res) => {
        const userId = req.body.user.id
        const { title, directions, ingredients, cookware, prepTime, cookTime, editRecipeId } = req.body
        try {
            const postDoc = await Post.findById(editRecipeId)
            const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(userId)
            if (!isAuthor) return res.status(400).json('You are not the author of this post!')
            else {
                await postDoc.updateOne({
                    title,
                    directions,
                    ingredients,
                    cookware,
                    prepTime,
                    cookTime
                })
                await helpers.checkAchievements(userId)
                res.json({ postDoc }).status(201)
            }
        } catch (error) {
            console.log(error)
            res.json('Failed to create recipe').status(500)
        }
    },
    deletePost: async (req, res) => {
        const userId = req.user.id
        const postId = req.params.id
        const postDoc = await Post.findById(postId)
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(userId)
        if (!isAuthor) return res.status(400).json('You are not the author of this post!')
        else {
            try {
                await Post.findByIdAndDelete(postId)
                res.json(`Post ${postId} deleted.`)
            } catch (err) {
                res.json({ 'error': err }).status(204)
            }
        }
    },
    viewPosts: async (req, res) => {
        const posts = await Post
            .find()
            .populate('author', ['username'])
            .populate('ingredients.ingredient', ['name', 'type'])
            .sort({ createdAt: -1 })
            .limit(20)
            .lean()
        res.json(posts)
    },
    viewPost: async (req, res) => {
        const { id } = req.params
        const substituteID = '123456789123456789012345'
        const postDoc = await Post
            .findById(id.length === 24 ? id : substituteID)
            .populate('author', ['username'])
            .populate('ingredients.ingredient', 'name')
        res.json(postDoc ? postDoc : null)
    },
    savePost: async (req, res) => {
        const postId = req.body.post
        const userId = req.body.user
        const postDoc = await Post.findById(postId)
        const userDoc = await User.findById(userId)

        if (postDoc.savedBy?.includes(userDoc._id)) {
            newSavedPosts = postDoc.savedBy.filter(x => x != String(userDoc._id))
            await postDoc.updateOne({
                savedBy: [...newSavedPosts]
            });
            res.json(`User id ${userId} removed from post ${postId}.`)
        } else {
            await postDoc.updateOne({
                savedBy: [...postDoc.savedBy, userDoc]
            }, { upsert: true });
            res.json(`User id ${userId} saved to post ${postId}.`)
        }
    }
}