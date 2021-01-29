import { SearchRestaurantsActionsConstants } from './constants';
import { call, put, takeEvery } from 'redux-saga/effects';
import SearchRestaurantsActions from './actions';


function* searchRestaurants(action){
    console.log('RestaurantsSaga=', action);
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
        yield put(SearchRestaurantsActions.searchRestaurantsSuccessAction(json, action.payload));
    } catch (e) {
        console.log('ERROR***********');
        yield put(SearchRestaurantsActions.searchRestaurantsFailureAction(e.message));
    }
}

function* SearchRestaurantsSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(SearchRestaurantsActionsConstants.SEARCH_RESTAURANTS, searchRestaurants);
}

export default SearchRestaurantsSaga;