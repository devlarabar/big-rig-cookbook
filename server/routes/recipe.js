const express = require('express')
const router = express.Router()
const recipeController = require('../controllers/recipe')
const cookieParser = require('cookie-parser')
router.use(express.json())
router.use(cookieParser())

router.get('/edit/:id', recipeController.createRecipeData)
router.post('/create', recipeController.createRecipe)
router.put('/edit', recipeController.editRecipe)
router.delete('/delete/:id', recipeController.deleteRecipe)
router.get('/viewrecipes', recipeController.viewRecipes)
router.get('/view/:id', recipeController.viewRecipe)
router.put('/save', recipeController.saveRecipe)

module.exports = router