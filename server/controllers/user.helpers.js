const User = require('../models/User')
const Recipe = require('../models/Recipe')
const Achievement = require('../models/Achievement')
const StretchStreak = require('../models/StretchStreak')
const StretchRoutine = require('../models/StretchRoutine')

module.exports = {
    removeUserReferences: async (user) => {
        await Recipe.deleteMany({ author: user._id })
        await StretchStreak.deleteMany({ user: user._id })
        await StretchRoutine.deleteMany({ user: user._id })
        await Recipe.updateMany({ savedBy: { "$in": [user._id] } }, { $pull: { savedBy: user._id } })
    }
}