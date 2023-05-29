import Categories from "../models/Categories.js";

const categoriesController = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await Categories.find({ user: req.userId }).sort({createdAt: -1, updatedAt: -1})
            res.json({ success: true, message: 'Get categories successfully!!!', categories })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    },
    createCategory: async (req, res) => {
        const { value } = req.body

        if (!value) return res.json({ success: false, message: 'Category is require' })

        try {
            const category = await new Categories({
                key: value.toLowerCase(),
                value,
                user: req.userId
            })

            await category.save()

            res.json({ success: true, message: 'Create category successfully!!!', category })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }
}

export default categoriesController;