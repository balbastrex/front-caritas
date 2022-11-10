import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  productList: [],
  product: {},
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getProductListSuccess(state, action) {
      state.isLoading = false;
      state.productList = action.payload;
    },

    getProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getProducts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/product');
      dispatch(slice.actions.getProductListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProductById(productId) {

  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/product/${productId}`);

      dispatch(slice.actions.getProductSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
