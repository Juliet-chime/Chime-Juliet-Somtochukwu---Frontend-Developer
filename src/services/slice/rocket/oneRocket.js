import { createSlice } from "@reduxjs/toolkit";
import makeAPICall from "../../apiUtils";

const initialState = {
  loading: false,
  error: null,
  rocket: {},
};

export const getOneRocketSlice = createSlice({
  name: "one-rocket",
  initialState,
  reducers: {
    getOneRocket: (state = initialState) => {
      state.loading = true;
    },
    getOneRocketSuccess: (state, { payload }) => {
      state.rocket = payload;
      state.loading = false;
    },
    getOneRocketFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

// Three actions generated from the slice
const { getOneRocket, getOneRocketSuccess, getOneRocketFailure } = getOneRocketSlice.actions;

// A selector
export const getOneRocketSelector = (state) => state.rocket.rocket;

// The reducer
export default getOneRocketSlice.reducer;

// api call action
export const fetchOneRocket = (rocket_id, params = null) => {
  return (dispatch) => {
    dispatch(getOneRocket());
    return makeAPICall({
      path: `/rockets/${rocket_id}`,
      params
    })
      .then((res) => {
        dispatch(getOneRocketSuccess(res));
      })
      .catch((err) => {
        dispatch(getOneRocketFailure(err));
      });
  }
};

