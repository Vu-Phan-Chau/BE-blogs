import mongoose from 'mongoose'

const { Schema } = mongoose

const CategoriesSchema = new Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, { timestamps: true })

export default mongoose.model('categories', CategoriesSchema)