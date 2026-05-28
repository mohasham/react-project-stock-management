import { all, call } from 'redux-saga/effects';
import { categoriesSaga } from './categories/category.saga';
import { userSagas } from './user/user.saga';
import { adminSagas } from './admin/admin.saga';

export function* rootSaga() {
  yield all([
    call(categoriesSaga),
    call(userSagas),
    call(adminSagas), // ✅ add this
  ]);
}
