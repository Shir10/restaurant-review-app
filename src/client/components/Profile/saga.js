import { call, put, takeEvery } from 'redux-saga/effects';
import { ProfileActionsConstants } from './constants';
import ProfileActions from './actions';


function* updateProfile(action){
    console.log('ProfileSaga=', action);
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
        yield put(ProfileActions.updateProfileSuccessAction(json, action.payload));
    } catch (e) {
        console.log('ERROR***********');
        yield put(ProfileActions.updateProfileFailureAction(e.message));
    }
}

function* checkProfileUsername(action){
    console.log('ProfileSaga=', action);
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
        yield put(ProfileActions.checkProfileUsernameSuccessAction(json));
    } catch (e) {
        console.log('ERROR***********');
        yield put(ProfileActions.checkProfileUsernameFailureAction(e.message));
    }
}

function* ProfileSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(ProfileActionsConstants.UPDATE_PROFILE, updateProfile);
    yield takeEvery(ProfileActionsConstants.CHECK_PROFILE_USERNAME, checkProfileUsername);
}

export default ProfileSaga;