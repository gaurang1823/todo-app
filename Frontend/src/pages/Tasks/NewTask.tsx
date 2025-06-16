import React, { useState, useEffect } from 'react';
import { Plus, Check, Edit, Trash2, Save, X } from 'lucide-react';
import './NewTask.css';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo as deleteTodoAPI,
} from '../../api';
import type { Todo as APITodo } from '../../api';

type Todo = APITodo;

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeView, setActiveView] = useState<'new' | 'completed'>('new');
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim()) {
      try {
        const newItem = await createTodo(newTodo.trim());
        setTodos(prev => [...prev, newItem]);
        setNewTodo('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoAPI(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleTodo = async (id: number) => {
    const current = todos.find(todo => todo.id === id);
    if (!current) return;

    try {
      await updateTodo(id, { 
        completed: !current.completed,
        text: current.text 
      });
      await fetchTodos(); // Refresh the entire list
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const startEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = async () => {
    if (editText.trim() && editingId !== null) {
      try {
        await updateTodo(editingId, { text: editText.trim() });
        await fetchTodos(); // Refresh the list after edit
        setEditingId(null);
        setEditText('');
      } catch (error) {
        console.error('Error saving edit:', error);
      }
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleNewTodoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTodo();
    }
  };

  const clearAllData = async () => {
    if (window.confirm('Are you sure you want to clear all todos?')) {
      try {
        // Delete each todo individually
        await Promise.all(todos.map(todo => deleteTodoAPI(todo.id)));
        setTodos([]);
      } catch (error) {
        console.error('Error clearing todos:', error);
      }
    }
  };

  const filteredTodos = activeView === 'new' 
    ? todos.filter(todo => !todo.completed)
    : todos.filter(todo => todo.completed);

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1 className="todo-title">Make Your List Now!</h1>
        <button onClick={clearAllData} className="clear-button">
          Clear All
        </button>
      </div>

      <div className="nav-buttons">
        <button
          onClick={() => setActiveView('new')}
          className={`nav-button ${activeView === 'new' ? 'active-new' : 'inactive'}`}
        >
          New Todo ({todos.filter(t => !t.completed).length})
        </button>
        <button
          onClick={() => setActiveView('completed')}
          className={`nav-button ${activeView === 'completed' ? 'active-completed' : 'inactive'}`}
        >
          Completed ({todos.filter(t => t.completed).length})
        </button>
      </div>

      {activeView === 'new' && (
        <div className="add-todo-section">
          <div className="add-todo-form">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={handleNewTodoKeyDown}
              placeholder="Enter new todo..."
              className="todo-input"
            />
            <button onClick={addTodo} className="add-button">
              <Plus size={18} />
            </button>
          </div>
        </div>
      )}

      <div className="todo-list">
        {filteredTodos.length === 0 ? (
          <p className="empty-message">
            {activeView === 'new' ? 'No pending todos' : 'No completed todos'}
          </p>
        ) : (
          filteredTodos.map(todo => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : 'pending'}`}
            >
              {editingId === todo.id ? (
                <div className="edit-container">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                    className="edit-input"
                    autoFocus
                  />
                  <button onClick={saveEdit} className="save-button">
                    <Save size={16} />
                  </button>
                  <button onClick={cancelEdit} className="cancel-button">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="todo-display">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`toggle-button ${todo.completed ? 'completed' : 'pending'}`}
                  >
                    {todo.completed && <Check size={12} />}
                  </button>

                  <span className={`todo-text ${todo.completed ? 'completed' : 'pending'}`}>
                    {todo.text}
                  </span>

                  <div className="action-buttons">
                    <button
                      onClick={() => startEdit(todo.id, todo.text)}
                      className="action-button edit-action-button"
                      title="Edit todo"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="action-button delete-action-button"
                      title="Delete todo"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}