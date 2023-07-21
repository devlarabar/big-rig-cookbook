const User = require('../models/User')
const Post = require('../models/Post')
const Ingredient = require('../models/Ingredient')
const jwt = require('jsonwebtoken')
const secret = 'salkdjfhsk2345rfgd324'

module.exports = {
    createPost: async (req, res) => {
        const { token } = req.cookies
        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) throw err
            const { title, summary, directions, ingredients, cookware, prepTime, cookTime } = req.body
            const ingList = ingredients.map(x => {
                return { ingredient: x.ingredient._id, qty: x.qty, measurement: x.measurement }
            })
            const postDoc = await Post.create({
                title,
                summary,
                directions,
                ingredients: ingList,
                cookware,
                prepTime,
                cookTime,
                author: info.id,
            })
            res.json({ postDoc })
        })
    },
    editPost: async (req, res) => {
        const { token } = req.cookies
        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) throw err
            const { id, title, summary, directions, ingredients, cookware, prepTime, cookTime } = req.body
            const ingList = ingredients.map(x => {
                return { ingredient: x.ingredient._id, qty: x.qty, measurement: x.measurement }
            })
            const postDoc = await Post.findById(id)
            const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)
    
            if (!isAuthor) {
                return res.status(400).json('You are not the author of this post!')
            }
            await postDoc.updateOne({
                title,
                summary,
                directions,
                ingredients: ingList,
                cookware,
                prepTime,
                cookTime,
            });
    
            res.json(postDoc)
        })
    },
    deletePost: async (req, res) => {
        const postId = req.params.id
        const postDoc = await Post.findById(postId)
        const { token } = req.cookies
        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) throw err
            const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)
            if (!isAuthor) {
                return res.status(400).json('You are not the author of this post!')
            }
            try {
                await Post.deleteOne({_id: postId})
                res.json(`Post ${postId} deleted.`)
            } catch(err) {
                res.json({ 'error': err }).status(204)
            }
        })
    },
    viewPosts: async (req, res) => {
        const posts = await Post
            .find()
            .populate('author', ['username'])
            .populate('ingredients.ingredient', ['name', 'type'])
            .sort({ createdAt: -1 })
            .limit(20)
        res.json(posts)
    },
    viewPost: async (req, res) => {
        const { id } = req.params
        if (id.length !== 12) {
            res.json(null)
        } else {
            const postDoc = await Post.findById(id).populate('author', ['username']).populate('ingredients.ingredient', 'name')
            res.json(postDoc ? postDoc : null)
        }
    },
    savePost: async (req, res) => {
        const postId = req.body.post
        const userId = req.body.user
        const postDoc = await Post.findById(postId)
        const userDoc = await User.findById(userId)
    
        if (postDoc.savedBy?.includes(userDoc._id)) {
            newSavedPosts = postDoc.savedBy.filter(x => x != String(userDoc._id))
            await postDoc.updateOne({
                savedBy: [ ... newSavedPosts ]
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