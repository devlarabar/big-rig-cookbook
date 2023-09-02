const User = require('../models/User')
const Recipe = require('../models/Recipe')
const UserAchievement = require('../models/UserAchievement')
const Stretch = require('../models/Stretch')
const jwt = require('jsonwebtoken')
const secret = 'salkdjfhsk2345rfgd324'
const helpers = require('./user.helpers')

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
        const username = req.params.username.toLowerCase()
        const userDoc = await User.findOne({ username })
        if (userDoc) {
            const recipes = await Recipe
                .find({ author: userDoc })
                .populate('author', ['username'])
                .populate('ingredients.ingredient', ['name', 'type'])
                .sort({ createdAt: -1 })
                .limit(20)
            const cookbook = (await Recipe
                .find({ savedBy: { "$in": [userDoc] } })
                .populate('author', ['username'])
                .populate('ingredients.ingredient', ['name', 'type'])
                .sort({ createdAt: -1 }))
            const stretches = (await Stretch
                .find({ savedBy: { "$in": [userDoc] } })
                .sort({ createdAt: -1 }))
            const achievements = (await UserAchievement
                .find({user: userDoc})
                .populate('achievement', ['name']))
            const response = {
                profile: {
                    id: userDoc._id,
                    username: userDoc.username,
                    achievements,
                    description: userDoc.description || ''
                },
                recipes,
                cookbook,
                stretches
            }
            res.json(response)
        } else {
            const response = { profile: '404' }
            res.status(404).json(response)
        }

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
    remacc: async (req, res) => {
        const user = await User.findById(req.user.id)
        const username = user.username
        try {
            await helpers.removeUserReferences(user)
            await User.deleteOne({ _id: req.user.id })
            res.json(`User "${username}" has been deleted.`)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}