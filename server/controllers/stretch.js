const User = require('../models/User')
const Achievement = require('../models/Achievement')
const Stretch = require('../models/Stretch')
const jwt = require('jsonwebtoken')
const secret = 'salkdjfhsk2345rfgd324'
const helpers = require('./post.helpers')

module.exports = {
    home: async (req, res) => {
        const stretches = await Stretch.find().sort({ name: -1})
        res.json(stretches)
    },
    save: async (req, res) => {
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
            await helpers.checkAchievements(info)

            res.json({ postDoc })
        })
    },
}