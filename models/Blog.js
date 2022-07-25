import mongoose from 'mongoose'

const { Schema } = mongoose

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    url: {
        type: String
    },
    category: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, { timestamps: true })

export default mongoose.model('blogs', BlogSchema)