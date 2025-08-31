import Todo from "../models/todo.model.js";
import { StatusCodes } from "http-status-codes";

/**
 * @desc    Create a new todo
 * @route   POST /api/todos
 * @access  Public
 */
const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        // console.log(title, description);

        if (!title || title.trim() === "") {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Title is required." });
        }

        const newTodo = await Todo.create({ title, description });

        res.status(StatusCodes.CREATED).json(newTodo);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error", error: error.message });
    }
};

/**
 * @desc    Get all todos
 * @route   GET /api/todos
 * @access  Public
 */
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });

        if (todos.length === 0) {
            return res.status(StatusCodes.OK).json({ message: "No todos found. Start by adding a new one." });
        }

        res.status(StatusCodes.OK).json(todos);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error", error: error.message });
    }
};

/**
 * @desc    Get single todo by ID
 * @route   GET /api/todos/:id
 * @access  Public
 */
const getTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Todo not found" });
        }

        res.status(StatusCodes.OK).json(todo);
    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error", error: error.message });
    }
};

/**
 * @desc    Update todo by ID
 * @route   PUT /api/todos/:id
 * @access  Public
 */
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;

        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Todo not found" });
        }

        // Check if no fields provided
        if (title === undefined && description === undefined && completed === undefined) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "At least one field (title, description, or completed) is required to update."
            });
        }

        // Check if provided strings are empty
        if (title !== undefined && title.trim() === "") {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Title cannot be empty." });
        }

        if (description !== undefined && description.trim() === "") {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Description cannot be empty." });
        }

        // Update fields if they are provided in the request body
        if (title !== undefined) todo.title = title;
        if (description !== undefined) todo.description = description;
        if (completed !== undefined) todo.completed = completed;

        const updatedTodo = await todo.save();
        res.status(StatusCodes.OK).json(updatedTodo);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error", error: error.message });
    }
};

/**
 * @desc    Delete todo by ID
 * @route   DELETE /api/todos/:id
 * @access  Public
 */
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Todo not found" });
        }
        await todo.deleteOne();

        res.status(StatusCodes.OK).json({ message: "Todo deleted successfully", deletedTodo: todo });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error", error: error.message });
    }
};

export { createTodo, getTodos, getTodoById, updateTodo, deleteTodo };