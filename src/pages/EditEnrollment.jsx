// src/pages/EditEnrollment.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import enrollmentService from '../services/enrollmentService';
import studentService from '../services/studentService';
import courseService from '../services/courseService';

const EditEnrollment = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [enrollmentDate, setEnrollmentDate] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [studentRes, courseRes, enrollmentRes] = await Promise.all([
          studentService.getAllStudents(),
          courseService.getAllCourses(),
          enrollmentService.getEnrollmentById(id)
        ]);

        setStudents(studentRes.data);
        setCourses(courseRes.data);

        const enrollment = enrollmentRes.data;
        setStudentId(enrollment.studentId?.toString() || '');
        setCourseId(enrollment.courseId?.toString() || '');
        setEnrollmentDate(enrollment.enrollmentDate?.split('T')[0] || '');
      } catch (err) {
        console.error('Error loading enrollment data:', err);
      }
    };

    loadData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEnrollment = {
      studentId: parseInt(studentId),
      courseId: parseInt(courseId),
      enrollmentDate
    };

    try {
      await enrollmentService.updateEnrollment(id, updatedEnrollment);
      navigate('/enrollments');
    } catch (err) {
      console.error('Error updating enrollment:', err);
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Enrollment</h2>
      <form onSubmit={handleSubmit}>
        <label>Student</label>
        <select value={studentId} onChange={(e) => setStudentId(e.target.value)} required>
          <option value="">-- Select Student --</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name || s.username || `Student #${s.id}`}
            </option>
          ))}
        </select>

        <label>Course</label>
        <select value={courseId} onChange={(e) => setCourseId(e.target.value)} required>
          <option value="">-- Select Course --</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name || `Course #${c.id}`}
            </option>
          ))}
        </select>

        <label>Enrollment Date</label>
        <input
          type="date"
          value={enrollmentDate}
          onChange={(e) => setEnrollmentDate(e.target.value)}
          required
        />

        <button type="submit">Update Enrollment</button>
      </form>
    </div>
  );
};

export default EditEnrollment;
