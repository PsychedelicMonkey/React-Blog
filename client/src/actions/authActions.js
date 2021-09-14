import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
} from './types';
import api from '../utils/api';

export const loginUser = (email, password) => async dispatch => {
  try {
    const res = await api.post('/auth/login', JSON.stringify({ email, password }));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOGIN_ERROR,
    });
  }
}

export const registerUser = (email, firstName, lastName, password, password2) => async dispatch => {
  try {
    const res = await api.post('/auth/register', JSON.stringify({ email, firstName, lastName, password, password2 }));
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REGISTER_ERROR,
    });
  }
}

export const logoutUser = () => dispatch => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
}
