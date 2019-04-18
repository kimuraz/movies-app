import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3000/' : '/api/';


const Api = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

Api.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token');
  token && (config.headers.Authorization = token);
  return config;
}, err => Promise.reject(err));

export const doLogin = credentials => Api.post('auth', credentials);
export const getMovies = () => Api.get('movies');
export const getMovieById = id => Api.get(`movies/${id}`);
export const newMovie = (movie) => Api.post('movies', movie);
export const editMovie = (id, movie) => Api.patch(`movies/${id}`, movie);
export const deleteMovie = (id) => Api.delete(`movies/${id}`);
export const getMovieComments = id => Api.get(`movies/${id}/comments`);
export const newComment = comment => Api.post(`comments`, comment);
export const editComment = comment => Api.patch(`comments/${comment.id}`, comment);
export const deleteComment = (id) => Api.delet(`comments/${id}`);

export default Api;
