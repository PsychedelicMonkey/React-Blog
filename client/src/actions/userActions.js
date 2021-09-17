import {
  GET_USERS,
  GET_USERS_ERROR,
  USERS_LOADING,
} from './types';
import api from '../utils/api';

export const getUsers = () => async dispatch => {
  try {
    dispatch({ type: USERS_LOADING });

    const res = await api.get('/users');
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_USERS_ERROR,
    });
  }
}
