import { call, put, takeEvery } from 'redux-saga/effects';
import { AppActionsConstants } from './constants';
import AppActions from './actions';


function* loadAllLocations(action){
    console.log('AppSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(AppActions.loadAllLocationsSuccessAction(json));
    } catch (e) {
        console.log('ERROR***********: ' + e.message);
        yield put(AppActions.loadAllLocationsFailureAction(e.message));
    }
}

function* getCurrentUser(action){
    console.log('AppSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(AppActions.getCurrentUserSuccessAction(json));
    } catch (e) {
        console.log('ERROR***********: ' + e.message);
        yield put(AppActions.getCurrentUserFailureAction(e.message));
    }
}

function* AppSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(AppActionsConstants.LOAD_ALL_LOCATIONS, loadAllLocations);
    yield takeEvery(AppActionsConstants.GET_CURRENT_USER, getCurrentUser);
}

export default AppSaga;