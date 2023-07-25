const mongoose = require('mongoose')
const { Schema, model } = mongoose

const AchievementSchema = new Schema({
    name: String,
    requirement: {
        recipes: Number,
        stretchStreak: Number,
    },
    users: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

const AchievementModel = model('Achievement', AchievementSchema)

module.exports = AchievementModel