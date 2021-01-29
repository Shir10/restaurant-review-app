import { UsersActionsConstants } from './constants';
import { call, put, takeEvery } from 'redux-saga/effects';
import UsersActions from './actions';


function* loadAllUsers(action){
    console.log('UsersSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(UsersActions.loadAllUsersSuccessAction(json, action.payload));
    } catch (e) {
        console.log('ERROR***********: ' + e.message);
        yield put(UsersActions.loadAllUsersFailureAction(e.message));
    }
}

function* searchUsers(action){
    console.log('UsersSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(UsersActions.searchUsersSuccessAction(json));
    } catch (e) {
        console.log('ERROR***********: ' + e.message);
        yield put(UsersActions.searchUsersFailureAction(e.message));
    }
}

function* UsersSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(UsersActionsConstants.LOAD_ALL_USERS, loadAllUsers);
    yield takeEvery(UsersActionsConstants.SEARCH_USERS, searchUsers);
}

export default UsersSaga;