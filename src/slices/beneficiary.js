import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  beneficiaryList: [],
  beneficiarySelector: [],
  beneficiary: {},
};

const slice = createSlice({
  name: 'beneficiary',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getBeneficiariesListSuccess(state, action) {
      state.isLoading = false;
      state.beneficiaryList = action.payload;
    },

    getBeneficiarySuccess(state, action) {
      state.isLoading = false;
      state.beneficiary = action.payload;
    },

    getBeneficiariesSelectorSuccess(state, action) {
      state.isLoading = false;
      state.beneficiarySelector = action.payload;
    },
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getBeneficiaries() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/beneficiary');
      dispatch(slice.actions.getBeneficiariesListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getBeneficiaryById(beneficiaryId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/beneficiary/${beneficiaryId}`);
      dispatch(slice.actions.getBeneficiarySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateBeneficiary(beneficiary) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.put(`/api/v1/beneficiary/${beneficiary.id}`, {
        ...beneficiary
      })

      const response = await axios.get('/api/v1/beneficiary');
      dispatch(slice.actions.getBeneficiariesListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getBeneficiariesSelector() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/beneficiary-selector');
      dispatch(slice.actions.getBeneficiariesSelectorSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
