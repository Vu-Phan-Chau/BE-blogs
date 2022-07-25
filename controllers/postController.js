import Post from '../models/Post.js'

const postController = {
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.find({ user: req.userId }).populate('user', ['username'])
            res.json({ success: true, message: 'Get successfully!!!', posts })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    },
    createPost: async (req, res) => {
        const { title, description, url, status } = req.body

        // Simple validation
        if (!title) {
            return res.status(400).json({ success: false, message: 'Title is require' });
        }

        try {
            // Create post
            const newPost = await new Post({
                title,
                description,
                url: url.startsWith('https://') ? url : `https://${url}`,
                status: status || 'TO LEARN',
                user: req.userId
            });

            await newPost.save();
    
            res.json({ success: true, message: 'Happy learning', post: newPost });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },
    updatePost: async (req, res) => {
        const { title, description, url, status } = req.body;

        // Simple validation
        if (!title) {
            return res.status(400).json({ success: false, message: 'Title is require' });
        }

        try {
            // Update post
            let updatePost = {
                title,
                description: description || '',
                url: (url.startsWith('https://') ? url : `https://${url}`) || '',
                status: status || 'TO LEARN'
            };
    
            const updatePostCondition = {
                _id: req.params.id,
                user: req.userId
            };
    
            updatePost = await Post.findOneAndUpdate(updatePostCondition, updatePost, { new: true });
    
            // User not authorised to update post or post not found
            if (!updatePost) {
                return res.status(401).json({ success: false, message: 'Post not found or user not authorised' });
            }
    
            res.json({ success: true, message: 'Update successfully!!!', post: updatePost });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },
    deletePost: async (req, res) => {
        try {
            const deletePostCondition = {
                _id: req.params.id,
                user: req.userId
            };
    
            const deletePost = await Post.findOneAndDelete(deletePostCondition);
    
            // User not authorised to update post or post not found
            if (!deletePost) {
                return res.status(401).json({ success: false, message: 'Post not found or user not authorised' });
            }
    
            res.json({ success: true, message: 'Delete successfully!!!', post: deletePost });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
}

export default postController