import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import authRouter from './routes/auth.js'
import postsRouter from './routes/post.js'
import profileRouter from './routes/profile.js'
import blogsRouter from "./routes/blog.js";

dotenv.config();

// CONNECT DB
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qe8k8.mongodb.net/learn-mongodb?retryWrites=true&w=majority`);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}
connectDB().then(() => console.log('Connected successfully'));

const app = express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT | 4000

app.use('/api/auth', authRouter)
app.use('/api/profile', profileRouter)
app.use('/api/posts', postsRouter)
app.use('/api/blogs', blogsRouter)

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))