import { createSlice } from '@reduxjs/toolkit';
import makeAPICall from '../../apiUtils';

const initialState = {
  loading: false,
  error: null,
  upcomingCapsules: [],
};

export const getUpcomingCapsulesSlice = createSlice({
  name: 'upcoming-capsule',
  initialState,
  reducers: {
    getUpcomingCapsule: (state = initialState) => {
      state.loading = true;
    },
    getUpcomingCapsuleSuccess: (state, { payload }) => {
      state.upcomingCapsules = payload;
      state.loading = false;
    },
    getUpcomingCapsuleFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

// Three actions generated from the slice
const { getUpcomingCapsule, getUpcomingCapsuleSuccess, getUpcomingCapsuleFailure } = getUpcomingCapsulesSlice.actions;

// A selector
export const getUpcomingCapsuleSelector = (state) => state.upcomingCapsule;

// The reducer
export default getUpcomingCapsulesSlice.reducer;

// api call action
export const fetchUpcomingCapsule = () => (dispatch) => {
  dispatch(getUpcomingCapsule());
  return makeAPICall({
    path: `/capsules/upcoming`,
  })
    .then((res) => {
      dispatch(getUpcomingCapsuleSuccess(res));
    })
    .catch((err) => {
      dispatch(getUpcomingCapsuleFailure(err));
    });
};
