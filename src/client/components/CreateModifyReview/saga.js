import { CreateModifyReviewActionsConstants } from './constants';
import { call, put, takeEvery } from 'redux-saga/effects';
import CreateModifyReviewActions from './actions';


function* submitAddReview(action){
    console.log('CreateModifyReviewSaga=', action);
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
        yield put(CreateModifyReviewActions.submitAddReviewSuccessAction(json));
    } catch (e) {
        console.log('ERROR***********');
        yield put(CreateModifyReviewActions.submitAddReviewFailureAction(e.message));
    }
}

function* submitEditReview(action){
    console.log('CreateModifyReviewSaga=', action);
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
        yield put(CreateModifyReviewActions.submitEditReviewSuccessAction(json, action.payload));
    } catch (e) {
        console.log('ERROR***********');
        yield put(CreateModifyReviewActions.submitEditReviewFailureAction(e.message));
    }
}

function* CreateModifyReviewSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(CreateModifyReviewActionsConstants.SUBMIT_ADD_REVIEW, submitAddReview);
    yield takeEvery(CreateModifyReviewActionsConstants.SUBMIT_EDIT_REVIEW, submitEditReview);
}

export default CreateModifyReviewSaga;