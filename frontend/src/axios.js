import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true, // if using cookies/sessions
});
console.log( import.meta.env.VITE_API_URL)
export default api;
