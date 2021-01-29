import { call, put, takeEvery } from 'redux-saga/effects';
import { RegisterActionsConstants } from './constants';
import RegisterActions from './actions';


function* register(action){
    console.log('RegisterSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            });

        const json = yield call([res, 'json']); // retrieve body of response
        yield put(RegisterActions.registerSuccessAction(json));
    } catch (e) {
        console.log('ERROR***********');
        yield put(RegisterActions.registerFailureAction(e.message));
    }
}

function* checkRegisterUsername(action){
    console.log('RegisterSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            });

        const json = yield call([res, 'json']); // retrieve body of response
        yield put(RegisterActions.checkRegisterUsernameSuccessAction(json));
    } catch (e) {
        console.log('ERROR***********');
        yield put(RegisterActions.checkRegisterUsernameFailureAction(e.message));
    }
}


function* RegisterSaga() {
    // using takeEvery, you take the action away from reducer to saga
    yield takeEvery(RegisterActionsConstants.REGISTER, register);
    yield takeEvery(RegisterActionsConstants.CHECK_REGISTER_USERNAME, checkRegisterUsername);
}

export default RegisterSaga;