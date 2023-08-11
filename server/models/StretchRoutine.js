const mongoose = require('mongoose')
const { Schema, model } = mongoose

const StretchRoutineSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    stretches: [{type: Schema.Types.ObjectId, ref: 'Stretch'}],
    streak: Number,
    longestStreak: Number
}, {
    timestamps: true
})

const StretchRoutineModel = model('StretchRoutine', StretchRoutineSchema)

module.exports = StretchRoutineModel