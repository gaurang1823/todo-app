import express, { Request, Response } from 'express';
import cors from 'cors';
import db from './db'; // import your SQLite DB

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/todos', (req: Request, res: Response) => {
  const todos = db.prepare('SELECT * FROM todos').all();
  res.json(todos);
});

app.post('/api/todos', (req: Request, res: Response) => {
  const text = req.body.text || '';
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO todos (text, completed, createdAt, updatedAt)
    VALUES (?, 0, ?, ?)
  `);
  const result = stmt.run(text, now, now);
  const newTodo = db.prepare('SELECT * FROM todos WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(newTodo);
});

// Update the PUT endpoint
app.put('/api/todos/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { text, completed } = req.body;
  const now = new Date().toISOString();
  
  try {
    const stmt = db.prepare(`
      UPDATE todos
      SET text = COALESCE(?, text),
          completed = COALESCE(?, completed),
          updatedAt = ?
      WHERE id = ?
    `);
    
    stmt.run(text, completed ? 1 : 0, now, id);
    
    // Return the updated todo
    const updatedTodo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

app.delete('/api/todos/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  db.prepare('DELETE FROM todos WHERE id = ?').run(id);
  res.json({ success: true });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});


// import express, { Request, Response } from 'express';
// import cors from 'cors';
// import fs from 'fs';
// import path from 'path';
// import { Todo } from './types/todo';

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(cors());
// app.use(express.json());

// const TODOS_FILE = path.join(__dirname, '../data/todos.json');

// // Helpers
// const loadTodos = (): Todo[] => {
//   if (!fs.existsSync(TODOS_FILE)) return [];
//   const data = fs.readFileSync(TODOS_FILE, 'utf-8');
//   return JSON.parse(data || '[]');
// };

// const saveTodos = (todos: Todo[]) => {
//   fs.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2));
// };

// // Routes
// app.get('/api/todos', (req: Request, res: Response) => {
//   res.json(loadTodos());
// });

// app.post('/api/todos', (req: Request, res: Response) => {
//   const todos = loadTodos();
//   const newTodo: Todo = {
//     id: Date.now(),
//     text: req.body.text || '',
//     completed: false,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString()
//   };
//   todos.push(newTodo);
//   saveTodos(todos);
//   res.status(201).json(newTodo);
// });

// app.put('/api/todos/:id', (req: Request, res: Response) => {
//   let todos = loadTodos();
//   const id = Number(req.params.id);
//   todos = todos.map(todo =>
//     todo.id === id
//       ? { ...todo, ...req.body, updatedAt: new Date().toISOString() }
//       : todo
//   );
//   saveTodos(todos);
//   res.json({ success: true });
// });

// app.delete('/api/todos/:id', (req: Request, res: Response) => {
//   const todos = loadTodos().filter(todo => todo.id !== Number(req.params.id));
//   saveTodos(todos);
//   res.json({ success: true });
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running at http://localhost:${PORT}`);
// });
