const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')

router.get('/isadmin', adminController.adminView)
router.post('/addingredient', adminController.addIngredient)

module.exports = router