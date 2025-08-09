// src/api/axiosInstance.ts

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // set in .env
  withCredentials: true,
});

export default axiosInstance;
