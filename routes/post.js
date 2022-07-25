import express from 'express'
import postController from '../controllers/postController.js'
import verifyToken from '../middleware/auth.js'

const router = express.Router()

// @route GET api/posts
// @desc GET posts
// @access Private
router.get('/', verifyToken, postController.getAllPosts)

// @route POST api/posts
// @desc Create post
// @access Private
router.post('/create', verifyToken, postController.createPost)

// @route PUT api/posts
// @desc PUT post
// @access Private
router.put('/update/:id', verifyToken, postController.updatePost)

// @route DELETE api/posts
// @desc DELETE post
// @access Private
router.delete('/delete/:id', verifyToken, postController.deletePost)

export default router