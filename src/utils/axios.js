import axios from 'axios';

// ----------------------------------------------------------------------

const headers = {
  'Content-Type': 'application/json'
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
  // baseURL: 'https://api.caritas.es',
  headers
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
