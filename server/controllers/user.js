const User = require('../models/User')
const Post = require('../models/Post')
const jwt = require('jsonwebtoken')
const secret = 'salkdjfhsk2345rfgd324'

module.exports = {
    userInfo: async (req, res) => {
        // Grab token from cookies (from Header.js)
        const username = req.params.username
        const { token } = req.cookies
        
        jwt.verify(token, secret, {}, (err, info) => {
            if (err) throw err
            res.json(info)
        })
    
        const userDoc = (await User.find({ username: username }))
        
        res.json(userDoc)
    },
    userProfile: async (req, res) => {
        const username = req.params.username
        const userDoc = await User.findOne({ username })
        const posts = await Post
            .find({ author: userDoc })
            .populate('author', ['username'])
            .populate('ingredients.ingredient', ['name', 'type'])
            .sort({ createdAt: -1 })
            .limit(20)
        const cookbook = (await Post
            .find({ savedBy: { "$in" : [userDoc]} })
            .populate('author', ['username'])
            .populate('ingredients.ingredient', ['name', 'type'])
            .sort({ createdAt: -1 }))
        const response = {
            profile: {
                id: userDoc._id,
                username: userDoc.username,
                savedPosts: userDoc.savedPosts,
            },
            posts,
            cookbook
        }
        res.json(response)
    },
    getUserData: async (req, res) => {
        const id = req.params.id
        const userDoc = await User.findById(id)
        const response = {
            id: userDoc._id,
            username: userDoc.username
        }
        res.json(response)
    },
    profile: (req, res) => {
        try {
            // Grab token from cookies (from Header.js)
            const { token } = req.cookies
            jwt.verify(token, secret, {}, (err, info) => {
                if (err) throw err
                res.json(info)
            })
        } catch (err) {
            res.status(400).json(err)
        }
        // res.json(req.cookies)
    }
}