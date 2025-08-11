import api from './api'; // Make sure this imports the token-intercepting Axios instance

const attendanceService = {
  getAllAttendances: () => api.get('/attendances/getAllAttendances'),
  //getAttendanceById: (id) => api.get(`/attendances/${id}`),
  getAttendanceById: (id) => api.get(`/attendances/getById/${id}`),

  addAttendance: (data) => api.post('/attendances/markAttendance', data),
  updateAttendance: (id, data) => api.put(`/attendances/update/${id}`, data),
  deleteAttendance: (id) => api.delete(`/attendances/delete/${id}`),
};

export default attendanceService;
