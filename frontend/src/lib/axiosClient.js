import axios from 'axios';
import {getTokenFromCookie} from "@/lib/auth";

const token = getTokenFromCookie()
const axiosClient = axios.create({
    baseURL: 'http://localhost:3001', // 👈 Your backend base URL
    withCredentials: true, // if you're using cookies
    headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    },
});

export default axiosClient;
