const User = require('../models/User')
const Achievement = require('../models/Achievement')
const Stretch = require('../models/Stretch')
const jwt = require('jsonwebtoken')
const secret = 'salkdjfhsk2345rfgd324'
const helpers = require('./post.helpers')
const StretchRoutine = require('../models/StretchRoutine')

module.exports = {
    home: async (req, res) => {
        const stretches = await Stretch.find().sort({ name: -1 })
        res.json(stretches)
    },
    getRoutine: async (req, res) => {
        userId = req.params.user
        const userDoc = await User.findById(userId)
        const routine = await StretchRoutine.find({ user: userDoc })
            .populate('stretches')
            .sort({ name: -1 })
        console.log(userDoc, routine)
        res.json(routine)
    },
    save: async (req, res) => {
        const stretchId = req.body.stretch
        const userId = req.body.user
        const stretchDoc = await Stretch.findById(stretchId)
        const userDoc = await User.findById(userId)

        if (stretchDoc.savedBy?.includes(userDoc._id)) {
            newSavedStretches = stretchDoc.savedBy.filter(x => x != String(userDoc._id))
            await stretchDoc.updateOne({
                savedBy: [...newSavedStretches]
            });
            res.json(`User id ${userId} removed from stretch ${stretchId}.`)
        } else {
            await stretchDoc.updateOne({
                savedBy: [...stretchDoc.savedBy, userDoc]
            }, { upsert: false });
            res.json(`User id ${userId} saved to stretch ${stretchId}.`)
        }
    },
}