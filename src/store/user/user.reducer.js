import { createSlice } from '@reduxjs/toolkit';

const initialState = { currentUser: null, isLoading: false, error: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    checkUserSession() {},
    googleSignInStart() {},
    emailSignInStart() {},
    signInSuccess(state, action) {
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailed(state, action) {
      state.error = action.payload;
    },
    signUpStart() {},
    signUpSuccess() {},
    signUpFailed(state, action) {
      state.error = action.payload;
    },
    signOutStart() {},
    signOutSuccess(state) {
      state.currentUser = null;
      state.error = null;
    },
    signOutFailed(state, action) {
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

