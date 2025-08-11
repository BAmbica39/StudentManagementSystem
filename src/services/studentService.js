import axios from 'axios';
import { getToken } from '../utils/jwtUtils';

const API = axios.create({
  baseURL: 'http://localhost:8080/api/students',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const studentService = {
  getAllStudents: () => API.get('/getAllStudents'),
  addStudent: (data) => API.post('/addStudent', data),
  updateStudent: (id, data) => API.put(`/${id}/updateStudent`, data),
  deleteStudent: (id) => API.delete(`/${id}/deleteStudent`),
};

export default studentService;
