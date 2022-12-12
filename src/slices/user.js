import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  userList: [],
  roleList: [],
  parishSelectorList: [],
  user: {},
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getUserListSuccess(state, action) {
      state.isLoading = false;
      state.userList = action.payload;
    },

    getRoleListSuccess(state, action) {
      state.isLoading = false;
      state.roleList = action.payload;
    },
    getParishSelectorListSuccess(state, action) {
      state.isLoading = false;
      state.parishSelectorList = action.payload;
    },

    getUserSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
    },
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getUsers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/user');
      dispatch(slice.actions.getUserListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getRoles() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/role');
      dispatch(slice.actions.getRoleListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getParishSelector() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/user/parish');
      dispatch(slice.actions.getParishSelectorListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserById(userId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/user/${userId}`);
      dispatch(slice.actions.getUserSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
