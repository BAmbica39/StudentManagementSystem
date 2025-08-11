import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import courseService from '../services/courseService';

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    duration: ''
  });

  // Load course by ID
  const loadCourse = useCallback(async () => {
    try {
      const res = await courseService.getCourseById(id);
      setForm(res.data);
    } catch (error) {
      console.error('Error loading course:', error);
      alert('Failed to load course');
    }
  }, [id]);

  useEffect(() => {
    loadCourse();
  }, [loadCourse]);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await courseService.updateCourse(id, form);
      alert('Course updated successfully!');
      navigate('/courses');
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Failed to update course');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Course</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 max-w-md">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Course Name"
          required
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Duration"
          required
          className="border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

export default EditCourse;
