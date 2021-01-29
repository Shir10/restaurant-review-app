import { AddRestaurantActionsConstants } from './constants';
import { call, put, takeEvery } from 'redux-saga/effects';
import AddRestaurantActions from './actions';


function* submitAddRestaurant(action){
    console.log('AddRestaurantSaga=', action);
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
        yield put(AddRestaurantActions.submitAddRestaurantSuccessAction(json));
    } catch (e) {
        console.log('ERROR***********');
        yield put(AddRestaurantActions.submitAddRestaurantFailureAction(e.message));
    }
}

function* AddRestaurantSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(AddRestaurantActionsConstants.SUBMIT_ADD_RESTAURANT, submitAddRestaurant);
}

export default AddRestaurantSaga;