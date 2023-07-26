const mongoose = require('mongoose')
const { Schema, model } = mongoose

const AchievementSchema = new Schema({
    name: String,
    requirements: {
        recipes: Number,
        stretchStreak: Number,
    }
})

const AchievementModel = model('Achievement', AchievementSchema)

module.exports = AchievementModel