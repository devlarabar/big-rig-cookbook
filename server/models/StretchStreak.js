const mongoose = require('mongoose')
const { Schema, model } = mongoose

const StretchStreakSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    stretch: { type: Schema.Types.ObjectId, ref: 'Stretch' },
    streak: Number,
    longestStreak: Number
}, {
    timestamps: true
})

const StretchStreakModel = model('StretchStreak', StretchStreakSchema)

module.exports = StretchStreakModel