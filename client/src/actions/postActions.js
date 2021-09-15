import {
  ADD_POST,
  ADD_POST_ERROR,
  GET_POSTS,
  GET_POSTS_ERROR,
  POSTS_LOADING,
} from './types';
import api from '../utils/api';

export const getPosts = () => async dispatch => {
  try {
    dispatch({ type: POSTS_LOADING });

    const res = await api.get('/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_POSTS_ERROR,
    });
  }
}

export const addPost = (title, content) => async dispatch => {
  try {
    const res = await api.post('/posts', JSON.stringify({ title, content }));
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADD_POST_ERROR,
    });
  }
}
