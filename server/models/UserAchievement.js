const mongoose = require('mongoose')
const { Schema, model } = mongoose

const UserAchievementSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    achievement: { type: Schema.Types.ObjectId, ref: 'Achievement' }
}, {
    timestamps: true
})

const UserAchievementModel = model('UserAchievement', UserAchievementSchema)

module.exports = UserAchievementModel