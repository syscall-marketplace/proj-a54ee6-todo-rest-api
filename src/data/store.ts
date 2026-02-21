import { Todo } from '../types/todo.js';

class TodoStore {
  private todos: Todo[] = [];
  private nextId = 1;

  getAll(): Todo[] {
    return [...this.todos];
  }

  getById(id: string): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  create(title: string): Todo {
    const todo: Todo = {
      id: this.nextId.toString(),
      title,
      completed: false,
      createdAt: new Date()
    };
    this.todos.push(todo);
    this.nextId++;
    return todo;
  }

  update(id: string, updates: { title?: string; completed?: boolean }): Todo | null {
    const todo = this.getById(id);
    if (!todo) return null;
    
    if (updates.title !== undefined) {
      todo.title = updates.title;
    }
    if (updates.completed !== undefined) {
      todo.completed = updates.completed;
    }
    return todo;
  }

  delete(id: string): boolean {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return false;
    this.todos.splice(index, 1);
    return true;
  }
}

export const todoStore = new TodoStore();