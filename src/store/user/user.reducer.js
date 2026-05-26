import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },

    checkUserSession(state) {
      state.isLoading = true;
      state.error = null;
    },

    googleSignInStart(state) {
      state.isLoading = true;
      state.error = null;
    },

    emailSignInStart(state) {
      state.isLoading = true;
      state.error = null;
    },

    signInSuccess(state, action) {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    signInFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    signUpStart(state) {
      state.isLoading = true;
      state.error = null;
    },

    // Optional intermediate action; no state update needed
    signUpSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },

    signUpFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    signOutStart(state) {
      state.isLoading = true;
      state.error = null;
    },

    signOutSuccess(state) {
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
    },

    signOutFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentUser,
  checkUserSession,
  googleSignInStart,
  emailSignInStart,
  signInSuccess,
  signInFailed,
  signUpStart,
  signUpSuccess,
  signUpFailed,
  signOutStart,
  signOutSuccess,
  signOutFailed,
} = userSlice.actions;

export const userReducer = userSlice.reducer;