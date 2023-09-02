const express = require('express')
const router = express.Router()
const stretchController = require('../controllers/stretch')
const authController = require('../controllers/auth')
const cookieParser = require('cookie-parser')
router.use(express.json())
router.use(cookieParser())

router.get('/', stretchController.home)
router.get('/getroutine/:user', stretchController.getRoutine)
router.get('/getstretches/:user', stretchController.getStretches)
router.post('/routine/create', stretchController.createRoutine)
router.put('/save', stretchController.save)
router.put('/complete/:routine', stretchController.markComplete)

module.exports = router