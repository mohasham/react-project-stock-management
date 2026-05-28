import { takeLatest, put, all, call } from 'redux-saga/effects';

import {
  adminSignInSuccess,
  adminSignInFailed,
  adminSignOutSuccess,
  adminSignOutFailed,
} from './admin.reducer';

const API_URL = 'http://localhost:5000/api/admin';

// ===============================
// API Helpers
// ===============================

const checkAdminSessionApi = async () => {
  const token = localStorage.getItem('adminToken');
  if (!token) throw new Error('No token found');

  const response = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await response.json();
  if (!response.ok) throw new Error('Session invalid');
  return data;
};

const signInAdminApi = async (email, password) => {
  const response = await fetch(`${API_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Sign in failed');
  return data;
};

// ===============================
// Sagas
// ===============================

function* checkAdminSessionSaga() {
  try {
    const data = yield call(checkAdminSessionApi);
    yield put(adminSignInSuccess(data.admin));
  } catch (error) {
    localStorage.removeItem('adminToken');
    yield put(adminSignInFailed(error.message));
  }
}

function* signInAdmin({ payload: { email, password } }) {
  try {
    const data = yield call(signInAdminApi, email, password);
    localStorage.setItem('adminToken', data.token);
    yield put(adminSignInSuccess(data.admin));
    console.log('Admin sign in successful ✅', data.admin);
  } catch (error) {
    yield put(adminSignInFailed(error.message));
    console.log('Admin sign in failed ❌', error.message);
  }
}

function* signOutAdmin() {
  try {
    localStorage.removeItem('adminToken');
    yield put(adminSignOutSuccess());
  } catch (error) {
    yield put(adminSignOutFailed(error.message));
  }
}

// ===============================
// Watchers
// ===============================

function* onCheckAdminSession() {
  yield takeLatest('admin/checkAdminSession', checkAdminSessionSaga);
}

function* onAdminSignInStart() {
  yield takeLatest('admin/adminSignInStart', signInAdmin);
}

function* onAdminSignOutStart() {
  yield takeLatest('admin/adminSignOutStart', signOutAdmin);
}

// ===============================
// Root Saga
// ===============================

export function* adminSagas() {
  yield all([
    call(onCheckAdminSession),
    call(onAdminSignInStart),
    call(onAdminSignOutStart),
  ]);
}