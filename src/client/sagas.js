import { all } from 'redux-saga/effects';
import AppSaga from './components/App/saga';
import TopBarSaga from './components/TopBar/saga';
import RegisterSaga from './components/Register/saga';
import LoginSaga from './components/Login/saga';
import profileSaga from './components/Profile/saga';
import RestaurantsSaga from './components/Restaurants/saga';
import RestaurantSaga from './components/Restaurant/saga';
import AddRestaurantSaga from './components/AddRestaurant/saga';
import SearchRestaurantsSaga from './components/SearchRestaurants/saga';
import CreateModifyReviewSaga from './components/CreateModifyReview/saga';
import UserReviewsSaga from './components/UserReviews/saga';
import UsersSaga from './components/Users/saga';


export default function* Sagas() {
    yield all([
        AppSaga(),
        TopBarSaga(),
        RegisterSaga(),
        LoginSaga(),
        profileSaga(),
        RestaurantsSaga(),
        RestaurantSaga(),
        AddRestaurantSaga(),
        SearchRestaurantsSaga(),
        CreateModifyReviewSaga(),
        UserReviewsSaga(),
        UsersSaga(),
    ])
}
