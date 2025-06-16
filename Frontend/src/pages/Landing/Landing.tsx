// import React from 'react'
// import Navbar from '../../components/Navbar'
// import { Link } from 'react-router-dom'
// import styles from './Landing.module.css' // Assuming you have a CSS file for styling
//  // Adjust the import path as needed
// const LandingPage: React.FC = () => {
//   return (
//     <div>
//       <Navbar />
//       <div className={styles['landing-container']}>
//         <div className={styles['landing-text']}>
//             <h1>Schedule your task <span className={styles['primaryText']}>ToDO!</span></h1>
            
//             <div className={styles['landing-buttons']}>
//               <Link to="/addtask" className={styles["btn-primary"]}>New Task</Link>
//               <Link to="/completed" className={styles["btn-secondary"]}>My Profile</Link>  
//             </div>     
//         </div>
        
//         </div>
//       </div>
//   )
// }

// export default LandingPage


import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css'; // Assuming you have a CSS file
import { getTodos, updateTodo, deleteTodo as deleteTodoAPI } from '../../api';
import { Check, Edit, Trash2, Save, X } from 'lucide-react';
import type { Todo as APITodo } from '../../api';

type Todo = APITodo;

const LandingPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
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
  }, []); // This will run when component mounts

  const deleteTodo = async (id: number) => {
    await deleteTodoAPI(id);
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleTodo = async (id: number) => {
    const current = todos.find(todo => todo.id === id);
    if (!current) return;

    try {
      // Update in backend first
      await updateTodo(id, { 
        completed: !current.completed,
        text: current.text 
      });
      
      // Fetch fresh data from server
      const refreshedTodos = await getTodos();
      setTodos(refreshedTodos);
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
      await updateTodo(editingId, { text: editText.trim() });
      setTodos(prev =>
        prev.map(todo =>
          todo.id === editingId ? { ...todo, text: editText.trim() } : todo
        )
      );
    }
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  return (
    <div>
      <Navbar />
      <div className={styles['landing-container']}>
        <div className={styles['landing-text']}>
          <h1>
            Schedule your task{' '}
            <span className={styles['primaryText']}>ToDO!</span>
          </h1>
          <div className={styles['landing-buttons']}>
            <Link to="/addtask" className={styles['btn-primary']}>
              New Task
            </Link>
            <Link to="/login" className={styles['btn-secondary']}>
              My Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Todo List Section */}
      <div className={styles['todo-list-section']}>
        <h2 className={styles['todo-heading']}>Your Tasks</h2>
        {todos.length === 0 ? (
          <p className={styles['empty-message']}>No tasks available</p>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              className={`${styles['todo-item']} ${todo.completed ? styles['completed'] : styles['pending']}`}
            >
              {editingId === todo.id ? (
                <div className={styles['edit-container']}>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                    className={styles['edit-input']}
                  />
                  <button onClick={saveEdit} className={styles['save-button']}>
                    <Save size={16} />
                  </button>
                  <button onClick={cancelEdit} className={styles['cancel-button']}>
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className={styles['todo-display']}>
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={styles['toggle-button']}
                  >
                    {todo.completed && <Check size={12} />}
                  </button>
                  <span
                    className={`${styles['todo-text']} ${
                      todo.completed ? styles['completed-text'] : ''
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => startEdit(todo.id, todo.text)}
                    className={styles['action-button']}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className={styles['action-button']}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LandingPage;
