import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import todoLogo from '../assets/todoist.svg' // Adjust the path as needed
import { NavLink } from 'react-router-dom';
const Navbar: React.FC = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="logo-wrapper">
  <img src={todoLogo} alt="Logo" className="logo" />
  <Link to="/" className="navbar-logo">ToDo</Link>
</div>
       <div className="navbar-links">
  <NavLink to="/home" className="navbar-link home">Home</NavLink>
          <NavLink to="/about" className="navbar-link">About</NavLink>
          <NavLink to="/contact" className="navbar-link">Contact</NavLink>
</div>
      </nav>
    </header>
  )
}

export default Navbar