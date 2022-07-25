import express from 'express'
import verifyToken from "../middleware/auth.js";
import profileController from "../controllers/profileController.js";
const router = express.Router()

// @route GET api/profile
// @desc Profile User
// @access Public
router.get('/', verifyToken, profileController.getProfile)

// @route POST api/profile/update
// @desc Profile User
// @access Public
router.post('/update/:id', verifyToken, profileController.updateProfile)

export default router