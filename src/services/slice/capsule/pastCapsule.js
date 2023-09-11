import { createSlice } from "@reduxjs/toolkit";
import makeAPICall from "../../apiUtils";

const initialState = {
  loading: false,
  error: null,
  pastCapsules: [],
};

export const getPastCapsulesSlice = createSlice({
  name: "past-capsule",
  initialState,
  reducers: {
    getPastCapsule: (state = initialState) => {
      state.loading = true;
    },
    getPastCapsuleSuccess: (state, { payload }) => {
      state.pastCapsules = payload;
      state.loading = false;
    },
    getPastCapsuleFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

// Three actions generated from the slice
const { getPastCapsule, getPastCapsuleSuccess, getPastCapsuleFailure } = getPastCapsulesSlice.actions;

// A selector
export const getPastCapsuleSelector = (state) => state.pastCapsule;

// The reducer
export default getPastCapsulesSlice.reducer;

// api call action
export const fetchPastCapsule = () => (dispatch) => {
  dispatch(getPastCapsule());
  return makeAPICall({
    path: `/capsules/past`,
  })
    .then((res) => {
      dispatch(getPastCapsuleSuccess(res));
    })
    .catch((err) => {
      dispatch(getPastCapsuleFailure(err));
    });
};