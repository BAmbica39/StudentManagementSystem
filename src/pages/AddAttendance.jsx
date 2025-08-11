// src/pages/AddAttendance.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import studentService from '../services/studentService';
import courseService from '../services/courseService';
import enrollmentService from '../services/enrollmentService';
import attendanceService from '../services/attendanceService';
import '../styles/attendance.css';

const AddAttendance = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState('');
  const [markedDate, setMarkedDate] = useState('');
  const [status, setStatus] = useState('Present');

  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [enrollmentId, setEnrollmentId] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    studentService.getAllStudents().then(res => setStudents(res.data));
    courseService.getAllCourses().then(res => setCourses(res.data));
    enrollmentService.getAllEnrollments().then(res => setEnrollments(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dto = {
      studentId,
      courseId,
      enrollmentId,
      attendanceDate,
      markedDate,
      status,
    };
    await attendanceService.addAttendance(dto);
    navigate('/attendance');
  };

  return (
    <div className="form-container">
      <h2>Mark Attendance</h2>
      <form onSubmit={handleSubmit}>
        <select value={studentId} onChange={(e) => setStudentId(e.target.value)} required>
          <option value="">Select Student</option>
          {students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>

        <select value={courseId} onChange={(e) => setCourseId(e.target.value)} required>
          <option value="">Select Course</option>
          {courses.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <select value={enrollmentId} onChange={(e) => setEnrollmentId(e.target.value)} required>
          <option value="">Select Enrollment</option>
          {enrollments.map((e) => <option key={e.id} value={e.id}>Enroll #{e.id}</option>)}
        </select>

        <input type="date" value={attendanceDate} onChange={(e) => setAttendanceDate(e.target.value)} required />
        <input type="datetime-local" value={markedDate} onChange={(e) => setMarkedDate(e.target.value)} required />

        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button type="submit">Mark</button>
      </form>
    </div>
  );
};

export default AddAttendance;