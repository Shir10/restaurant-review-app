import { combineReducers } from 'redux';
import AppReducer from './components/App/reducer';
import TopBarReducer from './components/TopBar/reducer';
import RegisterReducer from './components/Register/reducer';
import LoginReducer from './components/Login/reducer';
import ProfileReducer from './components/Profile/reducer';
import RestaurantsReducer from './components/Restaurants/reducer';
import RestaurantReducer from './components/Restaurant/reducer';
import AddRestaurantReducer from './components/AddRestaurant/reducer';
import SearchRestaurantsReducer from './components/SearchRestaurants/reducer';
import CreateModifyReviewReducer from './components/CreateModifyReview/reducer';
import UserReviewsReducer from './components/UserReviews/reducer';
import UsersReducer from './components/Users/reducer';


export default combineReducers({
  app: AppReducer,
  topBar: TopBarReducer,
  register: RegisterReducer,
  login: LoginReducer,
  profile: ProfileReducer,
  restaurants: RestaurantsReducer,
  restaurant: RestaurantReducer,
  addRestaurant: AddRestaurantReducer,
  searchRestaurants: SearchRestaurantsReducer,
  createModifyReview: CreateModifyReviewReducer,
  userReviews: UserReviewsReducer,
  users: UsersReducer,
});
