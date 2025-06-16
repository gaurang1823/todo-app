import React from 'react'
import './Contact.css' // Adjust the path as needed
import Navbar from '../components/Navbar';
const Contact: React.FC = () => {
    return (
    <div className='contact-card'>
      <Navbar />
      <h2>Contact Us</h2>
      <p>Email: contact@example.com</p>
      <p>Phone: +1 234 567 8901</p>
      <p>Address: 123 Main Street, City, Country</p>
    </div>
  );
}

export default Contact
