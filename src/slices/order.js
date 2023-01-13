import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  orderList: [],
  order: null,
  orderHistoryList: [],
  beneficiaryOrderHistoryList: [],
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

    getOrderCompleteListSuccess(state, action) {
      state.isLoading = false;
      state.orderHistoryList = action.payload;
    },

    getOrderBeneficiaryCompleteListSuccess(state, action) {
      state.isLoading = false;
      state.beneficiaryOrderHistoryList = action.payload;
    },
    getDeleteOrderSuccess(state, action) {
      console.log('==> action ', action)
      state.isLoading = false;
      const existingOrders = JSON.parse(JSON.stringify(state.orderList));
      const orderIndex = existingOrders.findIndex((order) => order.id === action.payload.orderId);
      existingOrders.splice(orderIndex, 1);
      state.orderList = existingOrders;
    }
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

export function getHistoryOrders() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/order-history');
      dispatch(slice.actions.getOrderCompleteListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getBeneficiaryHistoryOrders(beneficiaryId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/order-history/${beneficiaryId}`);
      dispatch(slice.actions.getOrderBeneficiaryCompleteListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getDeleteOrderById(orderId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/api/v1/order/${orderId}`);
      dispatch(slice.actions.getDeleteOrderSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
