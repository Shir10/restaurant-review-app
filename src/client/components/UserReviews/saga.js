import { UserReviewsActionsConstants } from './constants';
import { call, put, takeEvery } from 'redux-saga/effects';
import UserReviewsActions from './actions';


function* loadUserReviews(action){
    console.log('UserReviewsSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(UserReviewsActions.loadUserReviewsSuccessAction(json, action.payload));
    } catch (e) {
        console.log('ERROR***********: ' + e.message);
        yield put(UserReviewsActions.loadUserReviewsFailureAction(e.message));
    }
}

function* deleteReview(action){
    console.log('UserReviewsSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload.review)
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(UserReviewsActions.deleteReviewSuccessAction(json, action.payload));
    } catch (e) {
        console.log('ERROR***********: ' + e.message);
        yield put(UserReviewsActions.deleteReviewFailureAction(e.message));
    }
}

function* UserReviewsSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(UserReviewsActionsConstants.LOAD_USER_REVIEWS, loadUserReviews);
    yield takeEvery(UserReviewsActionsConstants.DELETE_REVIEW, deleteReview);
}

export default UserReviewsSaga;