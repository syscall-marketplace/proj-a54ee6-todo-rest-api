import { Request, Response } from 'express';
import { todoStore } from '../data/store.js';
import { TodoResponse, CreateTodoRequest, UpdateTodoRequest } from '../types/todo.js';

function toTodoResponse(todo: { id: string; title: string; completed: boolean; createdAt: Date }): TodoResponse {
  return {
    id: todo.id,
    title: todo.title,
    completed: todo.completed,
    createdAt: todo.createdAt.toISOString(),
  };
}

export function getTodos(req: Request, res: Response): void {
  const todos = todoStore.getAll();
  res.status(200).json(todos.map(toTodoResponse));
}

export function getTodoById(req: Request, res: Response): void {
  const todo = todoStore.getById(req.params.id);
  if (!todo) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }
  res.status(200).json(toTodoResponse(todo));
}

export function createTodo(req: Request, res: Response): void {
  const { title } = req.body as CreateTodoRequest;
  const todo = todoStore.create(title);
  res.status(201).json(toTodoResponse(todo));
}

export function updateTodo(req: Request, res: Response): void {
  const updates = req.body as UpdateTodoRequest;
  const todo = todoStore.update(req.params.id, updates);
  if (!todo) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }
  res.status(200).json(toTodoResponse(todo));
}

export function deleteTodo(req: Request, res: Response): void {
  const deleted = todoStore.delete(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }
  res.status(204).send();
}
