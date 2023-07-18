const express = require('express')
const router = express.Router()
const dataController = require('../controllers/data')

router.get('/ingredients', dataController.ingredients)

module.exports = router