import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  receiptList: [],
  receipt: {},
};

const slice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getReceiptListSuccess(state, action) {
      state.isLoading = false;
      state.receiptList = action.payload;
    },

    getReceiptSuccess(state, action) {
      state.isLoading = false;
      state.receipt = action.payload;
    },
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getReceipts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/receipt');
      dispatch(slice.actions.getReceiptListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getReceiptById(receiptId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/receipt/${receiptId}`);
      dispatch(slice.actions.getReceiptSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
