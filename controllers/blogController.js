import Blog from "../models/Blog.js";

const blogController = {
    getAllBlog: async (req, res) => {
        try {
            const results = {};
            const pageNumber = parseInt(req.body.pageNumber) || 0;
            const totalBlogs = await Blog.countDocuments().exec();
            const limit = 5;
            let startIndex = pageNumber * limit;

            results.blogs = await Blog.find({ user: req.userId })
                .sort({createdAt: -1, updatedAt: -1})
                .skip(startIndex)
                .limit(limit)
                .populate('user', 'email')
                .exec();

            results.rowsPerPage = limit
            results.totalBlogs = ((totalBlogs/limit) < 1.5 && (totalBlogs/limit) > 1) ? 2 : Math.round(totalBlogs/limit)
            results.pageNumber = pageNumber

            res.json({ success: true, message: 'Get successfully!!!', results })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    },
    createBlog: async (req, res) => {
        const { title, summary, description, url, category } = req.body

        if (!title) return res.status(400).json({ success: false, message: 'Title is require' })

        try {
            const newBlog = await new Blog({
                title,
                summary,
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
        const { title, summary, description, url, category } =  req.body

        if (!title) return res.status(400).json({ success: false, message: 'Title is require' })

        try {
            let updateBlog = {
                title,
                summary,
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
    },
    detailBlog: async (req, res) => {
        try {
            const detailBlogCondition = {
                _id: req.params.id,
                user: req.userId
            }

            const detailBlog = await Blog.findOne(detailBlogCondition)

            if (!detailBlog) return res.status(401).json({ success: false, message: 'Detail blog not found or user not authorised' })

            res.json({ success: true, message: 'Get detail successfully!!!', detailBlog })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    },
    queryBlog: async (req, res) => {
        const { title, category } = req.body

        try {
            const results = {};
            const pageNumber = parseInt(req.body.pageNumber) || 0;
            const totalBlogs = await Blog.count({ $or:[{'title': title}, {'category': category }] }).exec();
            const limit = 2;
            let startIndex = pageNumber * limit;

            results.blogs = await Blog.find({ user: req.userId, $or:[{'title': title}, {'category': category}] })
                .skip(startIndex)
                .limit(limit)
                .populate('user', 'email')
                .exec();

            results.rowsPerPages = limit
            results.totalBlogs = ((totalBlogs/limit) < 1.5 && (totalBlogs/limit) > 1) ? 2 : Math.round(totalBlogs/limit)
            results.pageNumber = pageNumber

            res.json({ success: true, message: 'Get successfully!!!', results })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }
}

export default blogController