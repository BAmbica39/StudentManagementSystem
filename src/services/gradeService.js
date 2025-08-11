// src/services/gradeService.js

import api from './api';

const gradeService = {
  // Create
  addGrade: (grade) => api.post('/grades/addGrade', grade),

  // Read all
  getAllGrades: () => api.get('/grades/getAllGrades'),

  // Read one (by ID)
getGradeById: (id) => api.get(`/grades/getGrade/${id}`),

  // Read by student
  getGradesByStudentId: (studentId) => api.get(`/grades/student/${studentId}`),

  // Read by student and course
  getGradeByStudentAndCourse: (studentId, courseId) =>
    api.get(`/grades/student/${studentId}/course/${courseId}`),

  // Update
  updateGrade: (id, grade) => api.put(`/grades/updateGrade/${id}`, grade),

  // Delete
  deleteGrade: (id) => api.delete(`/grades/deleteGrade/${id}`)
};

export default gradeService;
