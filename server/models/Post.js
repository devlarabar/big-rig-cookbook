const mongoose = require('mongoose')
const { Schema, model } = mongoose

const PostSchema = new Schema({
    title: String,
    summary: String,
    content: String,
    ingredients: Array,
    cookware: Array,
    prepTime: Number,
    cookTime: Number,
    //cover: String,
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    savedBy: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {
    timestamps: true
})

const PostModel = model('Post', PostSchema)

module.exports = PostModel