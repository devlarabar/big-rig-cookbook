const Post = require('../models/Post')
const User = require('../models/User')
const Achievement = require('../models/Achievement')

module.exports = {
    checkAchievements: async user => {
        const userDoc = await User.findById(user.id)
        const achievementModels = await Achievement.find()
        const authorPosts = await Post.count({ author: user.id })
        const userAchievements = userDoc.achievements ? userDoc.achievements : []
        // Check for Recipe Streak achievements
        // Recipes: 1
        if (!userDoc.achievements?.includes(achievementModels.filter(x => x.requirements.recipes === 1)[0]._id)) {
            const postStreak1 = await Achievement.findOne({ 'requirements.recipes': 1 })
            const achievements = userAchievements.length ? [...userAchievements, postStreak1._id] : [postStreak1._id]
            await userDoc.updateOne({
                achievements: achievements
            })
        }
    }
}