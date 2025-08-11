// src/pages/AddGrade.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gradeService from '../services/gradeService';
import studentService from '../services/studentService';
import courseService from '../services/courseService';
import enrollmentService from '../services/enrollmentService';

const AddGrade = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState('');
  const [marks, setMarks] = useState('');
  const [grade, setGrade] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    studentService.getAllStudents().then(res => setStudents(res.data));
    courseService.getAllCourses().then(res => setCourses(res.data));
    enrollmentService.getAllEnrollments().then(res => setEnrollments(res.data));
  }, []);

  const filteredEnrollments = enrollments.filter(
    (e) =>
      Number(e.studentId) === Number(selectedStudentId) &&
      Number(e.courseId) === Number(selectedCourseId)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedMarks = Number(marks);
    const trimmedGrade = grade.trim();

    if (!parsedMarks || isNaN(parsedMarks) || parsedMarks < 0) {
      alert("Please enter a valid marks number.");
      return;
    }

    if (!trimmedGrade) {
      alert("Please select a grade.");
      return;
    }

    const newGrade = {
      studentId: Number(selectedStudentId),
      courseId: Number(selectedCourseId),
      enrollmentId: Number(selectedEnrollmentId),
      marks: parsedMarks,
      grade: trimmedGrade,
    };

    try {
      await gradeService.addGrade(newGrade);
      navigate('/grades');
    } catch (err) {
      console.error('Error adding grade:', err.response?.data || err.message);
      alert('Failed to add grade.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h3 className="mb-4 text-center">Add Grade</h3>
        <form onSubmit={handleSubmit}>
          {/* Student Dropdown */}
          <select
            className="form-control mb-3"
            value={selectedStudentId}
            onChange={(e) => {
              setSelectedStudentId(e.target.value);
              setSelectedEnrollmentId('');
            }}
            required
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          {/* Course Dropdown */}
          <select
            className="form-control mb-3"
            value={selectedCourseId}
            onChange={(e) => {
              setSelectedCourseId(e.target.value);
              setSelectedEnrollmentId('');
            }}
            required
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Enrollment Dropdown */}
          {selectedStudentId && selectedCourseId && (
            <select
              className="form-control mb-3"
              value={selectedEnrollmentId}
              onChange={(e) => setSelectedEnrollmentId(e.target.value)}
              required
            >
              <option value="">Select Enrollment</option>
              {filteredEnrollments.length > 0 ? (
                filteredEnrollments.map((e) => (
                  <option key={e.id} value={e.id}>
                    Enrollment #{e.id}
                  </option>
                ))
              ) : (
                <option disabled>No matching enrollment</option>
              )}
            </select>
          )}

          {/* Marks Input */}
          <input
            type="number"
            className="form-control mb-3"
            placeholder="Enter marks"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            required
          />

          {/* Grade Dropdown */}
          <select
            className="form-control mb-3"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          >
            <option value="">Select Grade</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="F">F</option>
          </select>

          <button type="submit" className="btn btn-primary w-100">
            Add Grade
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGrade;