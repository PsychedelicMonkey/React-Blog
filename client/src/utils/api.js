import axios from 'axios';
import { logoutUser } from '../actions/authActions';
import store from '../store';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response.status === 401) {
      store.dispatch(logoutUser());
    }

    return Promise.reject(err);
  }
)

export default api;
