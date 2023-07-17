const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.get('/userinfo/:username', userController.userInfo)
router.get('/userprofile/:username', userController.userProfile)
router.get('/getuserdata/:id', userController.getUserData)


module.exports = router

// app.get('/getuserdata_un/:username', async (req, res) => {
//     const username = req.params.username
//     const userDoc = await User.findOne({ username })
//     const response = {
//         id: userDoc._id,
//         username: userDoc.username,
//         savedPosts: userDoc.savedPosts
//     }
//     res.json(response)
// })

// This runs whenever someone views a user profile