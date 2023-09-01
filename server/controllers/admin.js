const Ingredient = require('../models/Ingredient')
const Achievement = require('../models/Achievement')
const Stretch = require('../models/Stretch')
const User = require('../models/User')

module.exports = {
    adminView: async (req, res) => {
        const userId = req.body.user.id
        const userDoc = await User.findById(userId)
        if (userDoc.admin) {
            res.json({ auth: true })
        } else {
            res.json({ auth: false })
        }
    },
    addIngredient: async (req, res) => {
        const userId = req.body.user.id
        const userDoc = await User.findById(userId)
        if (userDoc.admin) {
            const { name, type } = req.body
            const ingredient = await Ingredient.create({
                name: name.toLowerCase(),
                type: type.toLowerCase()
            })
            console.log(req.body)
            res.json({ ingredient })
        } else {
            throw 'You are not authorized to modify the database.'
        }
    },
    addAchievement: async (req, res) => {
        const userId = req.body.user.id
        const userDoc = await User.findById(userId)
        if (userDoc.admin) {
            const { name, requirements } = req.body
            const achievement = await Achievement.create({
                name: name,
                requirements: requirements
            })
            console.log(req.body)
            res.json({ achievement })
        } else {
            throw 'You are not authorized to modify the database.'
        }
    },
    addStretch: async (req, res) => {
        const userId = req.body.user.id
        const userDoc = await User.findById(userId)
        if (userDoc.admin) {
            const { name, description, position, muscle } = req.body
            const stretch = await Stretch.create({
                name,
                description,
                position,
                muscle
            })
            console.log(req.body)
            res.json({ stretch })
        } else {
            throw 'You are not authorized to modify the database.'
        }
    }
}