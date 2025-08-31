import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        description: {
            type: String,
            trim: true,
            maxlength: 500,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true
    }
);

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;