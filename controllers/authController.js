import User from '../models/User.js'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

const authController = {
    register: async (req, res) => {
        const { fullName, email, password, phone, address } = req.body

        // Simple validation
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Missing email and/or password' })
        }

        try {
            // Check for existing email
            const user = await User.findOne({ email })
            if (user) {
                res.status(200).json({
                    success: false,
                    message: 'Email already taken'
                })
            }

            // All good
            const hashedPassword = await argon2.hash(password)
            const newUser = new User({ fullName, email, password: hashedPassword, phone, address })

            // save DB
            await newUser.save()

            // Return token
            const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET, {}, {})
            res.status(200).json({ success: true, message: 'User register successfully', accessToken })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body

        // Simple validation
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Missing email and/or password' })
        }

        try {
            // Check for existing email
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ success: false, message: 'Incorrect email and password' })
            }

            // Email found
            const passwordValid = await argon2.verify(user.password, password)
            if (!passwordValid) {
                return res.status(400).json({ success: false, message: 'Incorrect email and password' })
            }

            // All good
            // Return token
            const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {}, {})
            res.json({ success: true, message: 'User logged in successfully', accessToken })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }
}

export default authController