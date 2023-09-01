const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

router.get('/getuser', authController.getUser)
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

module.exports = router