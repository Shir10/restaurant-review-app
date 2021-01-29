import initialState from '../../initialState';
import { List } from 'immutable';
import { RestaurantsActionsConstants } from './constants.js';
import { CreateModifyReviewActionsConstants } from '../CreateModifyReview/constants';
import { AddRestaurantActionsConstants } from '../AddRestaurant/constants';
import { UserReviewsActionsConstants } from '../UserReviews/constants';


const RestaurantsReducer = (state = initialState.restaurants, action) => {
    console.log('RestaurantsReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case RestaurantsActionsConstants.LOAD_ALL_RESTAURANTS_SUCCESS:
            return state.set('restaurants', new List(action.payload.restaurants));
        case AddRestaurantActionsConstants.SUBMIT_ADD_RESTAURANT_SUCCESS:
            return state.update('restaurants', e => e.push(action.payload.restaurant));
        case UserReviewsActionsConstants.DELETE_REVIEW_SUCCESS:
            return state.set('restaurants', action.payload.restaurants);
        case CreateModifyReviewActionsConstants.SUBMIT_EDIT_REVIEW_SUCCESS:
            return state.set('restaurants', action.payload.restaurants);
        default: //otherwise state is lost!
            return state;
    }
};

export default RestaurantsReducer;