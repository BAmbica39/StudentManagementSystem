import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import studentService from '../services/studentService';
import '../styles/Students.css'; // ✅ Make sure this file exists

const Students = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await studentService.getAllStudents();
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await studentService.deleteStudent(id);
      fetchStudents(); // Refresh list
    } catch (error) {
      alert("Failed to delete student");
    }
  };

  return (
    <div className="students-container">
      <h2 className="students-title">Student List</h2>

      <button className="add-button" onClick={() => navigate('/students/add')}>
        + Add Student
      </button>

      <table className="students-table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>
                  <Link to={`/students/edit/${s.id}`}>
                    <button className="edit-btn">Edit</button>
                  </Link>
                  <button className="delete-btn" onClick={() => handleDelete(s.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5">No students found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Students;

