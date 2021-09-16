import {
  ADD_COMMENT,
  ADD_COMMENT_ERROR,
  ADD_POST,
  ADD_POST_ERROR,
  GET_POST,
  GET_POST_ERROR,
  GET_POSTS,
  GET_POSTS_ERROR,
  POSTS_LOADING,
} from '../actions/types';

const initialState = {
  post: null,
  posts: [],
  isLoading: false,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case POSTS_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case GET_POST:
      return {
        ...state,
        post: payload,
        isLoading: false,
      }
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        isLoading: false,
      }
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
      }
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: [payload, ...state.post.comments] },
      }
    case GET_POST_ERROR:
      return {
        ...state,
        post: null,
        isLoading: false,
      }
    case GET_POSTS_ERROR:
    case ADD_POST_ERROR:
    case ADD_COMMENT_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state;
  }
}
