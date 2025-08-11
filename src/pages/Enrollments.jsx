// src/pages/Enrollments.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import enrollmentService from '../services/enrollmentService';
import '../styles/enrollment.css';

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadEnrollments();
  }, []);

  const loadEnrollments = async () => {
    try {
      const res = await enrollmentService.getAllEnrollments();
      setEnrollments(res.data);
    } catch (err) {
      console.error('Error loading enrollments:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this enrollment?')) {
      try {
        await enrollmentService.deleteEnrollment(id);
        loadEnrollments(); // refresh after delete
      } catch (err) {
        console.error('Error deleting enrollment:', err);
      }
    }
  };

  return (
    <div className="container">
      <h2>Enrollments</h2>
      <button onClick={() => navigate('/enrollments/add')}>+ Add Enrollment</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student ID</th>
            <th>Course ID</th>
            <th>Enrollment Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.studentId}</td>
              <td>{e.courseId}</td>
              <td>{e.enrollmentDate}</td>
              <td>
                <button onClick={() => navigate(`/enrollments/edit/${e.id}`)}>Edit</button>
                <button onClick={() => handleDelete(e.id)} style={{ marginLeft: '10px', backgroundColor: '#d9534f', color: 'white' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Enrollments;
