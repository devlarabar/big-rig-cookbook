const express = require('express')
const router = express.Router()
const postController = require('../controllers/post')
const cookieParser = require('cookie-parser')
router.use(express.json())
router.use(cookieParser())

router.post('/create', postController.createPost)
router.put('/edit', postController.editPost)
router.delete('/delete/:id', postController.deletePost)
router.get('/viewposts', postController.viewPosts)
router.get('/view/:id', postController.viewPost)
router.put('/save', postController.savePost)

module.exports = router