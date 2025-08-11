// ✅ src/pages/Attendances.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import attendanceService from '../services/attendanceService';
import { getUserRole } from '../utils/jwtUtils';

const Attendances = () => {
  const [attendances, setAttendances] = useState([]);
  const navigate = useNavigate();
  const role = getUserRole();

  const loadData = async () => {
    try {
      const res = await attendanceService.getAllAttendances();
      setAttendances(res.data);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      alert('Unauthorized or failed to fetch attendances. Check admin access or token.');
    }
  };

  useEffect(() => {
    if (role !== 'ROLE_STUDENT') {
      loadData();
    }
  }, [role]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await attendanceService.deleteAttendance(id);
        loadData();
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Failed to delete attendance.');
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>

      {role !== 'ROLE_STUDENT' && (
        <button onClick={() => navigate('/attendance/add')} className="bg-green-600 text-white px-4 py-2 rounded mb-4">
          Add Attendance
        </button>
      )}

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Student</th>
            <th className="border px-4 py-2">Course</th>
            <th className="border px-4 py-2">Enrollment</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
            {role !== 'ROLE_STUDENT' && <th className="border px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {attendances.map((a) => (
            <tr key={a.id}>
              <td className="border px-4 py-2">{a.id}</td>
              <td className="border px-4 py-2">{a.studentId}</td>
              <td className="border px-4 py-2">{a.courseId}</td>
              <td className="border px-4 py-2">{a.enrollmentId}</td>
              <td className="border px-4 py-2">{a.attendanceDate}</td>
              <td className="border px-4 py-2">{a.status}</td>
              {role !== 'ROLE_STUDENT' && (
                <td className="border px-4 py-2">
                  <button
                    onClick={() => navigate(`/attendance/edit/${a.id}`)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendances;

