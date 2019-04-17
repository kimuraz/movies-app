import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3000/' : '/api/';


const Api = axios.create({
  baseURL,
  timeout: 3000,
});

Api.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token');
  token && (config.headers.Authorization = token);
  return config;
}, err => Promise.reject(err));

export const doLogin = credentials => Api.post('auth', credentials);

export default Api;
