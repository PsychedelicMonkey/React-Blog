import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isLoading: false,
      }
    case LOGOUT_SUCCESS:
    case LOGIN_ERROR:
    case REGISTER_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      }
    default:
      return state;
  }
}
