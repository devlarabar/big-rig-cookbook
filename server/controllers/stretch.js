const User = require('../models/User')
const Achievement = require('../models/Achievement')
const Stretch = require('../models/Stretch')
const StretchStreak = require('../models/StretchStreak')
const StretchRoutine = require('../models/StretchRoutine')
const jwt = require('jsonwebtoken')
const secret = 'salkdjfhsk2345rfgd324'
const helpers = require('./post.helpers')

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
        res.json(routine)
    },
    getStretches: async (req, res) => {
        userId = req.params.user
        const userDoc = await User.findById(userId)
        const stretches = await Stretch
            .find({ savedBy: { "$in": [userDoc] } })
            .sort({ name: -1 })
        res.json(stretches)
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
    markComplete: async (req, res) => {
        const stretchId = req.params.stretch
        const stretchStreakDoc = await StretchStreak.updateOne(
            { stretch: stretchId, user: req.body.authUser.id },
            { $inc: { streak: 1 } },
            { upsert: true }
        )
        res.json({ stretchStreak: stretchStreakDoc, success: true })
    }
}