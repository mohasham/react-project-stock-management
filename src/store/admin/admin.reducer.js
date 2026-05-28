import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentAdmin: null,
  isLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminSignInStart(state) {
      state.isLoading = true;
      state.error = null;
    },

    adminSignInSuccess(state, action) {
      state.currentAdmin = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    adminSignInFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    adminSignOutStart(state) {
      state.isLoading = true;
      state.error = null;
    },

    adminSignOutSuccess(state) {
      state.currentAdmin = null;
      state.isLoading = false;
      state.error = null;
    },

    adminSignOutFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    checkAdminSession(state) {
      state.isLoading = true;
      state.error = null;
    },
  },
});

export const {
  adminSignInStart,
  adminSignInSuccess,
  adminSignInFailed,
  adminSignOutStart,
  adminSignOutSuccess,
  adminSignOutFailed,
  checkAdminSession,
} = adminSlice.actions;

export const adminReducer = adminSlice.reducer;