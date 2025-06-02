import axios from 'axios';

export const apiProvider = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
});
