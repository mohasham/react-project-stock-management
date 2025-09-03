import { takeLatest, all, call, put } from 'redux-saga/effects';
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from './category.reducer';

// Instead of Firebase, fetch from your Express backend
async function fetchCategoriesFromApi() {
  const res = await fetch('http://localhost:5000/api/shop/categories');
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return await res.json();
}

function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(fetchCategoriesFromApi);
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error.message));
  }
}

function* onFetchCategories() {
  yield takeLatest(fetchCategoriesStart.type, fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
