import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  beneficiaryList: [],
  beneficiarySelector: [],
  beneficiaryOrderOptions: null,
  beneficiary: null,
  beneficiariesTurnList: [],
  beneficiaryAndNotesList: { beneficiaryName: '', notes: [] },
  BeneficiaryNeedsPrintList: [],
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

    resetBeneficiary(state) {
      state.beneficiary = null;
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

    getBeneficiaryOrderOptionsSuccess(state, action) {
      state.isLoading = false;
      state.beneficiaryOrderOptions = action.payload;
    },

    getBeneficiariesTurnSuccess(state, action) {
      state.isLoading = false;
      state.beneficiariesTurnList = action.payload;
    },

    getBeneficiaryNotesListSuccess(state, action) {
      state.isLoading = false;
      state.beneficiaryAndNotesList = action.payload;
    },
    getBeneficiaryNeedsPrintSuccess(state, action) {
      state.isLoading = false;
      state.BeneficiaryNeedsPrintList = action.payload;
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
    dispatch(slice.actions.resetBeneficiary());
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/beneficiary/${beneficiaryId}`);
      dispatch(slice.actions.getBeneficiarySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createBeneficiary(beneficiary) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    await axios.post('/api/v1/beneficiary', {
      ...beneficiary
    })
  };
}

export function updateBeneficiary(beneficiary) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.put(`/api/v1/beneficiary/${beneficiary.id}`, {
        ...beneficiary
      })

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

export function getBeneficiaryOrderOptions(beneficiaryId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/beneficiary-selector/${beneficiaryId}`);
      dispatch(slice.actions.getBeneficiaryOrderOptionsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function clearBeneficiaryOrderOptions() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.getBeneficiaryOrderOptionsSuccess(null));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getBeneficiariesTurn(turnId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/beneficiary-turn/${turnId}`);
      dispatch(slice.actions.getBeneficiariesTurnSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getBeneficiaryNotes(beneficiaryId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/beneficiary/${beneficiaryId}/notes`);
      dispatch(slice.actions.getBeneficiaryNotesListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getBeneficiaryNeedsPrint() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/beneficiary-license`);
      dispatch(slice.actions.getBeneficiaryNeedsPrintSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateBeneficiariesPrinted() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.put(`/api/v1/beneficiaries-printed`)

      dispatch(slice.actions.getBeneficiaryNeedsPrintSuccess([]));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
