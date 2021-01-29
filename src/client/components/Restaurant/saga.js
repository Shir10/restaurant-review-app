import { RestaurantActionsConstants } from './constants';
import { call, put, takeEvery } from 'redux-saga/effects';
import RestaurantActions from './actions';


function* loadRestaurant(action){
    console.log('RestaurantSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(RestaurantActions.loadRestaurantSuccessAction(json));
    } catch (e) {
        console.log('ERROR***********: ' + e.message);
        yield put(RestaurantActions.loadRestaurantFailureAction(e.message));
    }
}

function* RestaurantSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(RestaurantActionsConstants.LOAD_RESTAURANT, loadRestaurant);
}

export default RestaurantSaga;