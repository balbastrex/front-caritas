import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  parishList: [],
  parish: {},
  beneficiariesParish: []
};

const slice = createSlice({
  name: 'parish',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getParishesListSuccess(state, action) {
      state.isLoading = false;
      state.parishList = action.payload;
    },

    getParishSuccess(state, action) {
      state.isLoading = false;
      state.parish = action.payload;
    },
    getBeneficiaryParishSuccess(state, action) {
      state.isLoading = false;
      state.beneficiariesParish = action.payload;
    },
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getParishes() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/parish');
      dispatch(slice.actions.getParishesListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getParishById(parishId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/parish/${parishId}`);
      dispatch(slice.actions.getParishSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getBeneficiariesByParish(parishId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/parish/${parishId}/beneficiary`);
      dispatch(slice.actions.getBeneficiaryParishSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateParish(parish) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.put(`/api/v1/parish/${parish.id}`, {
        ...parish
      })

      const response = await axios.get('/api/v1/parish');
      dispatch(slice.actions.getParishesListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createParish(parish) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/v1/parish', {
        ...parish
      })

      const response = await axios.get('/api/v1/parish');
      dispatch(slice.actions.getParishesListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
