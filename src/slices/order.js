import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  orderList: [],
  order: {},
};

const slice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getOrderListSuccess(state, action) {
      state.isLoading = false;
      state.orderList = action.payload;
    },

    getOrderUpdateSuccess(state, action) {
      state.isLoading = false;
      const existingOrders = JSON.parse(JSON.stringify(state.orderList));
      const orderIndex = existingOrders.findIndex((order) => order.id === action.payload.orderId);
      existingOrders[orderIndex].status = action.payload.status;
      state.orderList= existingOrders;
    },

    getOrderSuccess(state, action) {
      state.isLoading = false;
      state.order = action.payload;
    },
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getOrders() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/order');
      dispatch(slice.actions.getOrderListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateStatusOrder(orderId, status) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.put(`/api/v1/order/${orderId}/status/${status}`);
      dispatch(slice.actions.getOrderUpdateSuccess({orderId, status}));
    } catch (error) {
      toast.error(error.message);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getOrderById(orderId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/order/${orderId}`);
      dispatch(slice.actions.getOrderSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
