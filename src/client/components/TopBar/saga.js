import { TopBarActionsConstants } from './constants';
import { call, put, takeEvery } from 'redux-saga/effects';
import TopBarActions from './actions';


function* logout(action){
    console.log('TopBarSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(TopBarActions.logoutSuccessAction(json));
    } catch (e) {
        console.log('ERROR***********: ' + e.message);
        yield put(TopBarActions.logoutFailureAction(e.message));
    }
}

function* TopBarSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(TopBarActionsConstants.LOGOUT, logout);

}

export default TopBarSaga;