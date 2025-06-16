import React from 'react'
import './About.css' // Adjust the path as needed
import Navbar from '../components/Navbar'
const About: React.FC = () => {
  return (
    <div className='about-card'>
      <Navbar />
      <h2>About</h2>
      <p>
        This is a simple About card.  
        You can use this section to describe your app or your team.
      </p>
    </div>
  );
}

export default About
