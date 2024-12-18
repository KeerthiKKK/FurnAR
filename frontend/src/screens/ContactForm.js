import React, { useState } from 'react';
import axios from 'axios';
import "../styles/ContactForm.css"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/contact/', formData);
      console.log('Message sent:', response.data);
      setSuccessMessage('Your message has been sent successfully!');
      
      // Clear the form fields
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setSuccessMessage('There was an error sending your message. Please try again.');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>Name:</label> 
      <input className='input'
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <br></br>

      <label>E-Mail:</label>
      <input className='input'
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <br></br>

      <label>Message:</label>
      <textarea className='inputmsg'
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        required
      />
      <br></br>
      
      <button className='btn' type="submit">Send Message</button>
      
      {successMessage && <p className="success-message">{successMessage}</p>}
    </form>
  );
};

export default ContactForm;
