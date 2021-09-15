import {
  ADD_POST,
  ADD_POST_ERROR,
  GET_POSTS,
  GET_POSTS_ERROR,
  POSTS_LOADING,
} from '../actions/types';

const initialState = {
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
    case GET_POSTS_ERROR:
    case ADD_POST_ERROR:
      return {
        ...state,
      }
    default:
      return state;
  }
}
