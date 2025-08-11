import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import './DashboardPage.css';

const DashboardPage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="dashboard-container" style={{ marginLeft: '220px' }}>
        <h1 className="dashboard-title">Welcome to the Student Dashboard</h1>
        <p className="dashboard-intro">
          Use the sidebar to navigate through students, courses, grades, attendance, and enrollments.
        </p>

        <div className="card-grid">
          <div className="card">
            <div className="card-title">Total Students</div>
            <div className="card-value">120</div>
          </div>
          <div className="card">
            <div className="card-title">Active Courses</div>
            <div className="card-value">8</div>
          </div>
          <div className="card">
            <div className="card-title">Ongoing Enrollments</div>
            <div className="card-value">45</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
