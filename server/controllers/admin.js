const Ingredient = require('../models/Ingredient')
const jwt = require('jsonwebtoken')
const secret = 'salkdjfhsk2345rfgd324'

module.exports = {
    adminView: (req, res) => {
        const { token } = req.cookies
        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) throw err
            res.json({ 'admin': info })
        })
    },
    addIngredient: async (req, res) => {
        const { token } = req.cookies
        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) throw err
            if (!info.admin) {
                throw 'You are not authorized to modify the database.'
            } else {
                const { name, type } = req.body
                const ingredient = await Ingredient.create({
                    name: name.toLowerCase(),
                    type: type.toLowerCase()
                })
                console.log(req.body)
                res.json({ ingredient })
            }
        })
    }
}