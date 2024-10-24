import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000', // This should point to your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
