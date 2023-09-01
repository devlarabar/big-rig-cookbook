const express = require('express')
const router = express.Router()
const settingsController = require('../controllers/settings')

router.post('/description', settingsController.updateDescription)

module.exports = router