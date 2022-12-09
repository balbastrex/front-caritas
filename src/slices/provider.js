import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  providerList: [],
};

const slice = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getProviderListSuccess(state, action) {
      state.isLoading = false;
      state.providerList = action.payload;
    },
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getProviders() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/provider');
      dispatch(slice.actions.getProviderListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
