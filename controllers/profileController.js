import User from "../models/User.js";

const profileController = {
    getProfile: async (req, res) => {
        try {
            const profile = await User.findOne({ _id: req.userId })
            res.json({ success: true, message: 'Get profile successfully!!!', profile })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    },
    updateProfile: async (req, res) => {
        const { fullName, email, phone, address } = req.body

        if (!fullName || !email || !phone || !address) {
            return res.status(400).json({ success: false, message: 'Data is required' })
        }

        try {
            let updateProfile = {
                fullName,
                email,
                phone,
                address
            }

            const updateProfileCondition = {
                _id: req.params.id,
                user: req.userId
            };

            updateProfile = await User.findOneAndUpdate(updateProfileCondition, updateProfile, { new: true })

            // User not authorised to update post or post not found
            if (!updateProfile) {
                return res.status(401).json({ success: false, message: 'User not found or user not authorised' });
            }
            res.json({ success: true, message: 'Update successfully!!!', post: updateProfile });
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }
};

export default profileController;