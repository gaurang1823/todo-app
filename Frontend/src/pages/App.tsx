import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Landing/Landing'
import AuthCard from './Tasks/Profile'
import TodoApp from './Tasks/NewTask'
import About from './About'
import Contact from './Contact'

// import ToDoList from './ToDo/ToDoList'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/addtask" element={<TodoApp />} />
      <Route path="/login" element={<AuthCard />} />
      
    </Routes>
  )
}

export default App

// import TodoList from './TodoList';
// import TodoFilter from './TodoFilter';
// import AddTodo from './AddTodo';
// import { useState } from 'react';

// type Todo = {
//   id: number;
//   text: string;
//   completed: boolean;
//   createdAt: Date;
// };

// const TodoApp: React.FC = () => {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
//   const [nextId, setNextId] = useState(1);

//   const addTodo = (text: string) => {
//     const newTodo: Todo = {
//       id: nextId,
//       text,
//       completed: false,
//       createdAt: new Date(),
//     };
//     setTodos([newTodo, ...todos]);
//     setNextId(nextId + 1);
//   };

//   const updateTodo = (id: number, text: string) => {
//     setTodos(todos.map(todo => 
//       todo.id === id ? { ...todo, text } : todo
//     ));
//   };

//   const deleteTodo = (id: number) => {
//     setTodos(todos.filter(todo => todo.id !== id));
//   };

//   const toggleTodo = (id: number) => {
//     setTodos(todos.map(todo => 
//       todo.id === id ? { ...todo, completed: !todo.completed } : todo
//     ));
//   };

//   const filteredTodos = todos.filter(todo => {
//     if (filter === 'active') return !todo.completed;
//     if (filter === 'completed') return todo.completed;
//     return true;
//   });

//   const counts = {
//     all: todos.length,
//     active: todos.filter(t => !t.completed).length,
//     completed: todos.filter(t => t.completed).length,
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8">
//       <div className="max-w-2xl mx-auto px-4">
//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
//             Todo List
//           </h1>
          
//           <AddTodo onAdd={addTodo} />
          
//           <TodoFilter
//             filter={filter}
//             onFilterChange={setFilter}
//             counts={counts}
//           />
          
//           <TodoList
//             todos={filteredTodos}
//             onUpdate={updateTodo}
//             onDelete={deleteTodo}
//             onToggle={toggleTodo}
//           />
          
//           {todos.length > 0 && (
//             <div className="mt-6 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
//               Total: {counts.all} tasks • Active: {counts.active} • Completed: {counts.completed}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TodoApp;

