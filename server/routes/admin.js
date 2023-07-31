const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')

router.get('/isadmin', adminController.adminView)
router.post('/addingredient', adminController.addIngredient)
router.post('/addachievement', adminController.addAchievement)
router.post('/addstretch', adminController.addStretch)

module.exports = router