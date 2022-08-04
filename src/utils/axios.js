import axios from 'axios';
import {apiAddress} from '../../apiAddress';

// ----------------------------------------------------------------------

const headers = {
  'Content-Type': 'application/json'
};

const axiosInstance = axios.create({
  baseURL: apiAddress,
  headers
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
