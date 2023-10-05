const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

router.get('/getuser', authController.getUser)
router.get('/checkusername/:username', authController.checkUsername)
router.get('/getquestions/:username', authController.getQuestions)
router.post('/validatequestions/:username', authController.validateQuestions)
router.post('/changepassword/:username', authController.changePassword)
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

module.exports = router