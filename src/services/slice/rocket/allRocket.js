import { createSlice } from '@reduxjs/toolkit';
import makeAPICall from '../../apiUtils';

const initialState = {
  loading: false,
  error: null,
  rockets: [],
};

export const getRocketSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    getRocket: (state = initialState) => {
      state.loading = true;
    },
    getRocketSuccess: (state, { payload }) => {
      state.rockets = payload;
      state.loading = false;
    },
    getRocketFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

// Three actions generated from the slice
const { getRocket, getRocketSuccess, getRocketFailure } = getRocketSlice.actions;

// A selector
export const getRocketSelector = (state) => state.rockets;

// The reducer
export default getRocketSlice.reducer;

// api call action
export const fetchRocket =
  (params = null) =>
  (dispatch) => {
    dispatch(getRocket());
    return makeAPICall({
      path: `/rockets`,
      params,
    })
      .then((res) => {
        dispatch(getRocketSuccess(res));
      })
      .catch((err) => {
        dispatch(getRocketFailure(err));
      });
  };
