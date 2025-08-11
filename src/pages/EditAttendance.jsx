import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import studentService from '../services/studentService';
import courseService from '../services/courseService';
import enrollmentService from '../services/enrollmentService';
import attendanceService from '../services/attendanceService';
import { getUserRole } from '../utils/jwtUtils';
import '../styles/attendance.css';

const EditAttendance = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [enrollmentId, setEnrollmentId] = useState('');
  const [attendanceDate, setAttendanceDate] = useState('');
  const [markedDate, setMarkedDate] = useState('');
  const [status, setStatus] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ Block STUDENT from editing attendance
  useEffect(() => {
    const role = getUserRole();
    if (role === 'ROLE_STUDENT') {
      alert("Access Denied. Students can't edit attendance.");
      navigate('/attendance');
    }
  }, [navigate]); // ✅ Warning fixed

  // ✅ Load initial form data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [studentsRes, coursesRes, enrollmentsRes, attendanceRes] = await Promise.all([
          studentService.getAllStudents(),
          courseService.getAllCourses(),
          enrollmentService.getAllEnrollments(),
          attendanceService.getAttendanceById(id),
        ]);

        setStudents(studentsRes.data);
        setCourses(coursesRes.data);
        setEnrollments(enrollmentsRes.data);

        const data = attendanceRes.data;
        setStudentId(data.studentId);
        setCourseId(data.courseId);
        setEnrollmentId(data.enrollmentId);
        setAttendanceDate(data.attendanceDate);
        setMarkedDate(data.markedDate);
        setStatus(data.status);
      } catch (err) {
        console.error('Error loading attendance data:', err);
        alert('Failed to load attendance record.');
      }
    };

    loadData();
  }, [id]);

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedDTO = {
      studentId,
      courseId,
      enrollmentId,
      attendanceDate,
      markedDate,
      status,
    };

    try {
      await attendanceService.updateAttendance(id, updatedDTO);
      navigate('/attendance');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update attendance.');
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Attendance</h2>
      <form onSubmit={handleSubmit}>
        <select value={studentId} onChange={(e) => setStudentId(e.target.value)} required>
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <select value={courseId} onChange={(e) => setCourseId(e.target.value)} required>
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select value={enrollmentId} onChange={(e) => setEnrollmentId(e.target.value)} required>
          <option value="">Select Enrollment</option>
          {enrollments.map((e) => (
            <option key={e.id} value={e.id}>
              Enroll #{e.id}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={attendanceDate}
          onChange={(e) => setAttendanceDate(e.target.value)}
          required
        />

        <input
          type="datetime-local"
          value={markedDate}
          onChange={(e) => setMarkedDate(e.target.value)}
          required
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditAttendance;

