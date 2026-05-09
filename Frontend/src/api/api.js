import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5267/api',
});

api.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage (phải khớp với tên bạn đã lưu ở hàm login là 'token')
    const token = localStorage.getItem('token');
    
    // Nếu có token, đính kèm vào Header Authorization
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
