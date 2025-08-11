import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import studentService from '../services/studentService';
import '../styles/StudentForm.css'; // Optional CSS file

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', dob: '', gender: '',
    phone: '', address: '', contact: '', userId: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await studentService.addStudent(formData);
      alert('Student added successfully!');
      navigate('/students');
    } catch (err) {
      alert('Failed to add student');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <input type="text" name="name" placeholder="Name" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="date" name="dob" required onChange={handleChange} />
        <input type="text" name="gender" placeholder="Gender" onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} />
        <input type="text" name="contact" placeholder="Contact" onChange={handleChange} />
        <input type="number" name="userId" placeholder="User ID" onChange={handleChange} />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;