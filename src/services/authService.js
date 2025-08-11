// src/services/authService.js
import api from './api';

const authService = {
  // POST: Login
  login: (credentials) => api.post('/auth/login', credentials),

  // POST: Register
  register: (userData) => api.post('/auth/register', userData),
};

export default authService;

