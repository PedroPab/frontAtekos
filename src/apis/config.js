import axios from 'axios';

const BASE_URL = import.meta.env.VITE_PUBLIC_API_URL
console.log('BASE_URL', BASE_URL)
const apiClient = axios.create({
  baseURL: `${BASE_URL}/api/v1`, // Reemplaza con la URL de tu API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;