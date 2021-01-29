import { RestaurantsActionsConstants } from './constants';
import { call, put, takeEvery } from 'redux-saga/effects';
import RestaurantsActions from './actions';


function* loadAllRestaurants(action){
    console.log('RestaurantsSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(RestaurantsActions.loadAllRestaurantsSuccessAction(json));
    } catch (e) {
        console.log('ERROR***********: ' + e.message);
        yield put(RestaurantsActions.loadAllRestaurantsFailureAction(e.message));
    }
}


function* RestaurantsSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(RestaurantsActionsConstants.LOAD_ALL_RESTAURANTS, loadAllRestaurants);
}

export default RestaurantsSaga;