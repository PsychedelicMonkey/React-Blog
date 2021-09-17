import {
  GET_USERS,
  GET_USERS_ERROR,
  USERS_LOADING,
} from '../actions/types';

const initialState = {
  users: null,
  isLoading: false,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USERS_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case GET_USERS:
      return {
        ...state,
        users: payload,
        isLoading: false,
      }
    case GET_USERS_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state;
  }
}
