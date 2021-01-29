import { call, put, takeEvery } from 'redux-saga/effects';
import { LoginActionsConstants } from './constants';
import LoginActions from './actions';


function* login(action){
    console.log('LoginSaga=', action);
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
        yield put(LoginActions.loginSuccessAction(json));
    } catch (e) {
        console.log('ERROR***********');
        yield put(LoginActions.loginFailureAction(e.message));
    }
}

function* LoginSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(LoginActionsConstants.LOGIN, login);
}

export default LoginSaga;