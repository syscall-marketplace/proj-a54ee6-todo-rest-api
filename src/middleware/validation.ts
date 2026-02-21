import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const CreateTodoSchema = z.object({
  title: z.string().min(1, 'Title is required and must be a non-empty string'),
});

const UpdateTodoSchema = z.object({
  title: z.string().min(1, 'Title must be a non-empty string').optional(),
  completed: z.boolean().optional(),
});

export function validateCreateTodo(req: Request, res: Response, next: NextFunction): void {
  const result = CreateTodoSchema.safeParse(req.body);
  if (!result.success) {
    const message = result.error.errors.map((e) => e.message).join(', ');
    res.status(400).json({ error: message });
    return;
  }
  req.body = result.data;
  next();
}

export function validateUpdateTodo(req: Request, res: Response, next: NextFunction): void {
  const result = UpdateTodoSchema.safeParse(req.body);
  if (!result.success) {
    const message = result.error.errors.map((e) => e.message).join(', ');
    res.status(400).json({ error: message });
    return;
  }
  req.body = result.data;
  next();
}
