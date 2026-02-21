import { Router } from 'express';
import { getHealth } from '../handlers/healthHandler.js';
import { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } from '../handlers/todoHandlers.js';
import { validateCreateTodo, validateUpdateTodo } from '../middleware/validation.js';

const router = Router();

router.get('/health', getHealth);

router.get('/todos', getTodos);
router.get('/todos/:id', getTodoById);
router.post('/todos', validateCreateTodo, createTodo);
router.put('/todos/:id', validateUpdateTodo, updateTodo);
router.delete('/todos/:id', deleteTodo);

export default router;
