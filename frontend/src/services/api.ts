// frontend/services/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001', // cổng chạy backend NestJS
    withCredentials: true,            // nếu dùng cookie/session
});

export default api;
