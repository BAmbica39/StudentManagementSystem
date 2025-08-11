// src/services/enrollmentService.js
import api from './api';

const enrollmentService = {
  // Fetch all enrollments
  getAllEnrollments: () => api.get('/enrollments/getAllEnrollments'),

  // Fetch a single enrollment by ID
  getEnrollmentById: (id) => api.get(`/enrollments/getEnrollment/${id}`),

  // Fetch enrollments for a specific student
  getEnrollmentsByStudentId: (studentId) => api.get(`/enrollments/student/${studentId}`),

  // Add a new enrollment
  addEnrollment: (data) => api.post('/enrollments/enrollStudent', data),

  // Update an existing enrollment
  updateEnrollment: (id, data) => api.put(`/enrollments/updateEnrollment/${id}`, data),

  // Delete an enrollment
  deleteEnrollment: (id) => api.delete(`/enrollments/deleteEnrollment/${id}`),
};

export default enrollmentService;
