import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  marketList: [],
  market: {},
  parishMarket: [],
  productMarket: []
};

const slice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getMarketsListSuccess(state, action) {
      state.isLoading = false;
      state.marketList = action.payload;
    },

    getMarketSuccess(state, action) {
      state.isLoading = false;
      state.market = action.payload;
    },

    getParishMarketSuccess(state, action) {
      state.isLoading = false;
      state.parishMarket = action.payload;
    },

    getProductMarketSuccess(state, action) {
      state.isLoading = false;
      state.productMarket = action.payload;
    },
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getMarkets() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/market');
      dispatch(slice.actions.getMarketsListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getMarketById(marketId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/market/${marketId}`);
      dispatch(slice.actions.getMarketSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getParishByMarketId(marketId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/market/${marketId}/parish`);
      dispatch(slice.actions.getParishMarketSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProductByMarketId(marketId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/market/${marketId}/product`);
      dispatch(slice.actions.getProductMarketSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateMarket(market) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.put(`/api/v1/market/${market.id}`, {
        ...market
      })

      const response = await axios.get('/api/v1/market');
      dispatch(slice.actions.getMarketsListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
