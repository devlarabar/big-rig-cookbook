const User = require('../models/User')
const Filter = require('bad-words')
const filter = new Filter();

module.exports = {
    updateDescription: async (req, res) => {
        const user = req.body.user
        const description = req.body.description
        if (!filter.isProfane(description)) {
            await User.findOneAndUpdate({ _id: user.id }, { description: description})
            res.json(description)
        } else {
            res.json({profane: true}).status(400)
        }
    }
}