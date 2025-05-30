import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000", // تأكد أنها تشير إلى السيرفر الصحيح
  withCredentials: true, // إذا كنت تستخدم الـ cookie
});

// ✅ إضافة التوكن تلقائيًا في كل الطلبات
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt-netflix"); // هنا اسم التوكن
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // إرسال التوكن
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
