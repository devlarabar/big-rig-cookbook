const User = require('../models/User')
const Achievement = require('../models/Achievement')
const Stretch = require('../models/Stretch')
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
        const userId = req.params.user
        const userDoc = await User.findById(userId)
        const routines = await StretchRoutine.find({ user: userDoc })
            .populate('stretches')
            .sort({ name: -1 })
        res.json(routines)
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
    createRoutine: async (req, res) => {
        const user = req.user
        const { name, stretches } = req.body
        try {
            const routineDoc = await StretchRoutine.create({
                user: user.id,
                name: name,
                stretches: stretches,
                streak: 0,
                longestStreak: 0
            })
            console.log(`New stretch routine created: ${name} (${routineDoc._id})`)
            res.json(routineDoc)
        } catch (err) {
            res.status(400).json(err)
        }
    },
    markComplete: async (req, res) => {
        const routineId = req.params.routine
        const routineDoc = await StretchRoutine.findById(routineId)
        const longest = routineDoc.streak + 1 > routineDoc.longestStreak ? routineDoc.streak + 1 : routineDoc.longestStreak
        await StretchRoutine.updateOne(
            { $inc: { streak: 1 }, longestStreak: longest }
        )
        res.json({ routine: routineDoc, success: true })
    }
}