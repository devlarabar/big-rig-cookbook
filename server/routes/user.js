const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.get('/userinfo/:username', userController.userInfo)
router.get('/userprofile/:username', userController.userProfile)
router.get('/getuserdata/:id', userController.getUserData)
router.delete('/remacc', userController.remacc)

module.exports = router