# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
# Todo List Application

A full-stack task management application built with React, Node.js, TypeScript, and SQLite.

## Features

- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Filter todos by status (New/Completed)
- Responsive design for all screen sizes
- Clean and intuitive user interface
- Persistent data storage with SQLite
- Real-time updates
- User authentication interface (Profile page)

## Tech Stack

### Frontend
- React 19
- TypeScript
- React Router DOM
- Lucide React (for icons)
- CSS Modules
- Vite (build tool)

### Backend
- Node.js
- Express
- TypeScript
- Better-SQLite3
- CORS

## Project Structure
├── Backend/ │ ├── data/ │ │ └── todos.db │ └── src/ │ ├── db.ts │ ├── index.ts │ └── types/ │ └── todo.ts └── frontend/ ├── src/ │ ├── api.ts │ ├── components/ │ ├── pages/ │ └── assets/ └── public/


## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Backend Setup
```bash
cd Backend
npm install
npm run dev

### Frontend Setup
cd frontend
npm install
npm run dev

The frontend development server will start at http://localhost:5173

API Endpoints
GET /api/todos
Returns all todos
POST /api/todos
Creates a new todo
Body: { text: string }
PUT /api/todos/:id
Updates a todo
Body: { text?: string, completed?: boolean }
DELETE /api/todos/:id
Deletes a todo by ID

### Available Scripts
### Frontend
npm run dev - Start development server
npm run build - Build for production
npm run lint - Run ESLint
npm run preview - Preview production build
### Backend
npm run dev - Start development server with hot reload
npm test - Run tests (to be implemented)



This README provides:
- A clear project overview
- Feature list
- Tech stack details
- Setup instructions
- API documentation
- Available scripts
