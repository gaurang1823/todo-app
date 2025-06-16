const API_BASE = 'http://localhost:3001/api/todos';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch(API_BASE);
  return await res.json();
};

export const createTodo = async (text: string): Promise<Todo> => {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  return await res.json();
};

export const updateTodo = async (id: number, data: Partial<Todo>): Promise<Todo> => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
  await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
};
