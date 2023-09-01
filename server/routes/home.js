const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')

router.get('/test', homeController.test)

module.exports = router