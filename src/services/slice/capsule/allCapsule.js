import { createSlice } from "@reduxjs/toolkit";
import makeAPICall from "../../apiUtils";

const initialState = {
  loading: false,
  error: null,
  capsules: [],
};

export const getCapsulesSlice = createSlice({
  name: "capsule",
  initialState,
  reducers: {
    getCapsule: (state = initialState) => {
      state.loading = true;
    },
    getCapsuleSuccess: (state, { payload }) => {
      state.capsules = payload;
      state.loading = false;
    },
    getCapsuleFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

// Three actions generated from the slice
const { getCapsule, getCapsuleSuccess, getCapsuleFailure } = getCapsulesSlice.actions;

// A selector
export const getCapsuleSelector = (state) => state.capsules;

// The reducer
export default getCapsulesSlice.reducer;

// api call action
export const fetchCapsule = (params = null) => (dispatch) => {
  console.log(params,'parammm')
  dispatch(getCapsule());
  return makeAPICall({
    path: `/capsules`,
    params
  })
    .then((res) => {
      dispatch(getCapsuleSuccess(res));
    })
    .catch((err) => {
      dispatch(getCapsuleFailure(err));
    });
};