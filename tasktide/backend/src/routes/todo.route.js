import express from 'express';
import { getTodos, createTodo, getTodoById, updateTodo, deleteTodo, } from '../controllers/todo.controller.js';

const router = express.Router();

router.route('/')
    .get(getTodos)
    .post(createTodo);

router.route('/:id')
    .get(getTodoById)
    .put(updateTodo)
    .delete(deleteTodo);

export default router;