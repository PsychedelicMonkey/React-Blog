import {
  ADD_COMMENT,
  ADD_COMMENT_ERROR,
  DELETE_COMMENT,
  DELETE_COMMENT_ERROR,
  ADD_POST,
  ADD_POST_ERROR,
  GET_POST,
  GET_POST_ERROR,
  GET_POSTS,
  GET_POSTS_ERROR,
  DELETE_POST,
  DELETE_POST_ERROR,
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

export const getPost = id => async dispatch => {
  try {
    dispatch({ type: POSTS_LOADING });

    const res = await api.get(`/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_POST_ERROR,
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

export const addComment = (id, content) => async dispatch => {
  try {
    const res = await api.post(`/posts/comments/${id}`, JSON.stringify({ content }));
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADD_COMMENT_ERROR,
    });
  }
}

export const deletePost = id => async dispatch => {
  try {
    const res = await api.delete(`/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: DELETE_POST_ERROR,
    });
  }
}

export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    const res = await api.delete(`/posts/comments/${postId}/${commentId}`);
    dispatch({
      type: DELETE_COMMENT,
      payload: commentId,
    });
  } catch (err) {
    dispatch({
      type: DELETE_COMMENT_ERROR,
    });
  }
}
