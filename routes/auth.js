import express from 'express'
import authController from '../controllers/authController.js'
const router = express.Router()

// @route POST api/auth/register
// @desc Register User
// @access Public
router.post('/register', authController.register)

// @route POST api/auth/login
// @desc Login User
// @access Public
router.post('/login', authController.login)

export default router