import initialState from '../../initialState';
import { List } from 'immutable';
import { SearchRestaurantsActionsConstants } from './constants.js';
import { RestaurantsActionsConstants } from '../Restaurants/constants.js';
import { AddRestaurantActionsConstants } from '../AddRestaurant/constants';


const SearchRestaurantsReducer = (state = initialState.searchRestaurants, action) => {
    console.log('SearchRestaurantsReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case RestaurantsActionsConstants.LOAD_ALL_RESTAURANTS_SUCCESS:
            return state.set('searchRestaurants', new List(action.payload.restaurants));
        case SearchRestaurantsActionsConstants.SEARCH_RESTAURANT_NAME:
            return state.set('searchRestaurantName', action.payload.searchRestaurantName);
        case SearchRestaurantsActionsConstants.SEARCH_RESTAURANT_LOCATION:
            return state.set('searchRestaurantLocation', action.payload.searchRestaurantLocation);
        case SearchRestaurantsActionsConstants.SEARCH_RESTAURANT_SCORE:
            return state.set('searchRestaurantScore', action.payload.searchRestaurantScore);
        case SearchRestaurantsActionsConstants.SEARCH_RESTAURANT_CLOSER_BETTER:
            return state.set('searchRestaurantCloserBetter', action.payload.searchRestaurantCloserBetter);
        case SearchRestaurantsActionsConstants.SEARCH_RESTAURANTS_SUCCESS:
            return state.set('searchRestaurants',  new List(action.payload.restaurants));
        case SearchRestaurantsActionsConstants.GET_SUGGESTED_RESTAURANTS_NAMES:
            return state.set('suggestedRestaurantsNames', action.payload.suggestedRestaurantsNames.toArray());
        case RestaurantsActionsConstants.RESET_RESTAURANT_FIELDS:
            return state.set('searchRestaurants', action.payload.restaurants).set('searchRestaurantName', '')
                .set('searchRestaurantLocation', '').set('searchRestaurantScore', 0).set('searchRestaurantCloserBetter', 'better');
        case AddRestaurantActionsConstants.SUBMIT_ADD_RESTAURANT_SUCCESS:
            return state.update('searchRestaurants', e => e.push(action.payload.restaurant));
        default: //otherwise state is lost!
            return state;
    }
};

export default SearchRestaurantsReducer;