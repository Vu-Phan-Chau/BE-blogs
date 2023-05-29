import express from 'express'
import verifyToken from '../middleware/auth.js'
import categoriesController from "../controllers/categoriesController.js";

const router = express.Router()

// @route GET api/blogs
// @desc Get blogs
// @access Private
router.get('/', verifyToken, categoriesController.getAllCategories)

// @route POST api/blogs/create
// @desc Post blogs
// @access Private
router.post('/create', verifyToken, categoriesController.createCategory)

export default router