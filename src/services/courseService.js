import api from './api';

const courseService = {
  getAllCourses: () => api.get('/courses/getAllCourses'),
  getCourseById: (id) => api.get(`/courses/${id}/getCourseById`),
  addCourse: (course) => api.post('/courses/addcourse', course),
  updateCourse: (id, course) => api.put(`/courses/${id}/updateCourse`, course),
  deleteCourse: (id) => api.delete(`/courses/${id}/deleteCourse`),
};

export default courseService;
