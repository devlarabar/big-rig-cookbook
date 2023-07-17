const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')

router.post('/register', homeController.register)
router.post('/login', homeController.login)
router.post('/logout', homeController.logout)
router.get('/test', homeController.test)

module.exports = router