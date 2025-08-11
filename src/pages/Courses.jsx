// ✅ src/pages/Courses.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import courseService from '../services/courseService';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const loadCourses = async () => {
    try {
      const res = await courseService.getAllCourses();
      setCourses(res.data);
    } catch (error) {
      console.error('Failed to load courses:', error);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseService.deleteCourse(id);
        alert('Course deleted successfully!');
        loadCourses();
      } catch (error) {
        console.error('Failed to delete course:', error);
        alert('Delete failed');
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Courses</h2>
      <button onClick={() => navigate('/courses/add')} className="bg-green-600 text-white px-4 py-2 rounded mb-4">
        Add New Course
      </button>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Duration</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td className="border px-4 py-2">{course.id}</td>
              <td className="border px-4 py-2">{course.name}</td>
              <td className="border px-4 py-2">{course.description}</td>
              <td className="border px-4 py-2">{course.duration}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => navigate(`/courses/edit/${course.id}`)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
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

export default Courses;
