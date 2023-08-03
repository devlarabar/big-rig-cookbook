const express = require('express')
const router = express.Router()
const stretchController = require('../controllers/stretch')
const cookieParser = require('cookie-parser')
router.use(express.json())
router.use(cookieParser())

router.get('/', stretchController.home)
router.put('/save', stretchController.save)

module.exports = router