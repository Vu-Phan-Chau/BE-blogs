import express from 'express'
import verifyToken from '../middleware/auth.js'
import blogController from "../controllers/blogController.js";

const router = express.Router()

// @route GET api/blogs
// @desc Get blogs
// @access Private
router.post('/', verifyToken, blogController.getAllBlog)

// @route POST api/blogs/create
// @desc Post blogs
// @access Private
router.post('/create', verifyToken, blogController.createBlog)

// @route POST api/blogs/update
// @desc Post blogs
// @access Private
router.post('/update/:id', verifyToken, blogController.updateBlog)

// @route POST api/blogs/delete
// @desc Post blogs
// @access Private
router.post('/delete/:id', verifyToken, blogController.deleteBlog)


export default router