const Recipe = require('../models/Recipe')
const User = require('../models/User')
const Achievement = require('../models/Achievement')
const UserAchievement = require('../models/UserAchievement')

module.exports = {
    checkAchievements: async userId => {
        console.log('Checking for achievements...')
        const recipeCount = await Recipe.count({ author: userId })
        // Check for Recipe Streak achievements
        // Recipes: 1
        if (recipeCount >= 1) {
            const recipeStreak1 = await Achievement.findOne({ 'requirements.recipes': 1 })
            const achieved = await UserAchievement.findOne({ user: userId, achievement: recipeStreak1._id })
            if (achieved) console.log('User has already earned this achievement.')
            else {
                const awardRecipeStreak1 = await UserAchievement.create({ user: userId, achievement: recipeStreak1 })
                console.log(awardRecipeStreak1)
            }
        }
    }
}