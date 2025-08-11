import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Student Manager</h2>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
        <NavLink to="/students" className={({ isActive }) => isActive ? 'active' : ''}>Students</NavLink>
        <NavLink to="/courses" className={({ isActive }) => isActive ? 'active' : ''}>Courses</NavLink>
        <NavLink to="/grades" className={({ isActive }) => isActive ? 'active' : ''}>Grades</NavLink>
        <NavLink to="/attendance" className={({ isActive }) => isActive ? 'active' : ''}>Attendance</NavLink>
        <NavLink to="/enrollments" className={({ isActive }) => isActive ? 'active' : ''}>Enrollments</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
