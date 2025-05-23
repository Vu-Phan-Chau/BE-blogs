import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRouter from './routes/auth.js'
import postsRouter from './routes/post.js'
import profileRouter from './routes/profile.js'
import blogsRouter from "./routes/blog.js"
import categoriesRouter from "./routes/categories.js"

dotenv.config()

// CONNECT DB
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ji3hfpa.mongodb.net/`);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}
connectDB().then()

const app = express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 4000

app.use('/api/auth', authRouter)
app.use('/api/profile', profileRouter)

app.use('/api/posts', postsRouter)
app.use('/api/blogs', blogsRouter)

app.use('/api/categories', categoriesRouter)

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))