import { takeLatest, put, all, call } from 'redux-saga/effects';

import {
  signInSuccess,
  signInFailed,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
} from './user.reducer';

// ===============================
// API Helpers
// ===============================

const API_URL = 'http://localhost:5000/api/customers';

const checkSessionApi = async () => {
  const token = localStorage.getItem('customerToken');
  if (!token) throw new Error('No token found');

  const response = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await response.json();
  if (!response.ok) throw new Error('Session invalid');
  return data;
};

// Sign Up
const signUpApi = async (displayName, email, password) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      displayName,
      email,
      password,
    }),
  });

  const data = await response.json();
  

  if (!response.ok) {
    throw new Error(data.message || 'Sign up failed');
  }

  return data;
};

// Sign In
const signInApi = async (email, password) => {
  const response = await fetch(`${API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Sign in failed');
  }

  return data;
};

// ===============================
// Sagas
// ===============================

function* checkUserSessionSaga() {
  try {
    const data = yield call(checkSessionApi);
    yield put(signInSuccess(data.customer));
  } catch (error) {
    localStorage.removeItem('customerToken');
    yield put(signInFailed(error.message));
  }
}

function* signUp({ payload: { displayName, email, password } }) {
  try {
    const data = yield call(signUpApi, displayName, email, password);

    // Save token
    localStorage.setItem('customerToken', data.token); // ✅ specific key
    // Save customer as current user
    yield put(signInSuccess(data.customer));
    alert('Account created successfully! 🎉'); // ✅ here, after confirmed success
  } catch (error) {
    yield put(signUpFailed(error.message));
  }
}

function* signInWithEmail({ payload: { email, password } }) {
  try {
    const data = yield call(signInApi, email, password);

    // Save token
     localStorage.setItem('customerToken', data.token); // ✅ specific key

    // Save customer as current user
    yield put(signInSuccess(data.customer));
     console.log('Sign in successful ✅', data.customer);
  } catch (error) {
    yield put(signInFailed(error.message));
  }
}

function* signOut() {
  try {
    localStorage.removeItem('customerToken'); // ✅ specific key
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error.message));
  }
}

// ===============================
// Watchers
// ===============================

function* onCheckUserSession() {
  yield takeLatest('user/checkUserSession', checkUserSessionSaga);
}

function* onEmailSignInStart() {
  yield takeLatest('user/emailSignInStart', signInWithEmail);
}

function* onSignUpStart() {
  yield takeLatest('user/signUpStart', signUp);
}

function* onSignOutStart() {
  yield takeLatest('user/signOutStart', signOut);
}

// ===============================
// Root Saga
// ===============================

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignOutStart),
  ]);
}