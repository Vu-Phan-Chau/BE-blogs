import Blog from "../models/Blog.js";

const blogController = {
    getAllBlog: async (req, res) => {
        try {
            const pageNumber = parseInt(req.body.pageNumber) || 0;
            const limit = 3;
            const results = {};
            const totalBlogs = await Blog.countDocuments().exec();
            let startIndex = pageNumber * limit;

            results.blogs = await Blog.find({ user: req.userId })
                .sort({createdAt: -1, updatedAt: -1})
                .skip(startIndex)
                .limit(limit)
                .populate('user', 'email')
                .exec();

            results.rowsPerPage = limit
            results.totalBlogs = Math.round(totalBlogs / limit)
            results.pageNumber = pageNumber

            res.json({ success: true, message: 'Get successfully!!!', results })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    },
    createBlog: async (req, res) => {
        const { title, description, url, category } = req.body

        if (!title) return res.status(400).json({ success: false, message: 'Title is require' })

        try {
            const newBlog = await new Blog({
                title,
                description,
                url: url.startsWith('https://') ? url : `https://${url}`,
                category,
                user: req.userId
            })

            await newBlog.save()

            res.json({ success: true, message: 'Create blog successfully!!!', blog: newBlog })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    },
    updateBlog: async (req, res) => {
        const { title, description, url, category } =  req.body

        if (!title) return res.status(400).json({ success: false, message: 'Title is require' })

        try {
            let updateBlog = {
                title,
                description: description || '',
                url: (url.startsWith('https://') ? url : `https://${url}`) || '',
                category: category || 'all'
            }

            const updateBlogCondition = {
                _id: req.params.id,
                user: req.userId
            }

            updateBlog = await Blog.findOneAndUpdate(updateBlogCondition, updateBlog, { new: true })

            if (!updateBlog) return res.status(401).json({ success: false, message: 'Blog not found or user not authorised' })

            res.json({ success: true, message: 'Update successfully!!!', post: updateBlog })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    },
    deleteBlog: async (req, res) => {
        try {
            const deleteBlogCondition = {
                _id: req.params.id,
                user: req.userId
            }

            const deleteBlog = await Blog.findOneAndDelete(deleteBlogCondition)

            if (!deleteBlog) return res.status(401).json({ success: false, message: 'Blog not found or user not authorised' })

            res.json({ success: true, message: 'Delete successfully!!!', blog: deleteBlog })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }
}

export default blogController