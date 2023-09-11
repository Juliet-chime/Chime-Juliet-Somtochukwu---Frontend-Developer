import { createSlice } from "@reduxjs/toolkit";
import makeAPICall from "../../apiUtils";

const initialState = {
  loading: false,
  error: null,
  capsule: {},
};

export const getOneCapsuleSlice = createSlice({
  name: "one-capsule",
  initialState,
  reducers: {
    getOneCapsule: (state = initialState) => {
      state.loading = true;
    },
    getOneCapsuleSuccess: (state, { payload }) => {
      state.capsule = payload;
      state.loading = false;
    },
    getOneCapsuleFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

// Three actions generated from the slice
const { getOneCapsule, getOneCapsuleSuccess, getOneCapsuleFailure } = getOneCapsuleSlice.actions;

// A selector
export const getOneCapsuleSelector = (state) => state.capsule;

// The reducer
export default getOneCapsuleSlice.reducer;

// api call action
export const fetchOneCapsule = (capsule_serial,params=null) => {
    console.log("lll")
    return (dispatch) => {
  dispatch(getOneCapsule());
  return makeAPICall({
    path: `/capsules/${capsule_serial}`,
    params
  })
    .then((res) => {
      dispatch(getOneCapsuleSuccess(res));
    })
    .catch((err) => {
      dispatch(getOneCapsuleFailure(err));
    });
}};

// const fn = fetchCapsule("")
// fn()
