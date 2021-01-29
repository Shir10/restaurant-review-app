import { RestaurantsActionsConstants} from './constants.js';


function loadAllRestaurantsAction() {
    return {
        type: RestaurantsActionsConstants.LOAD_ALL_RESTAURANTS,
        uri: '/api/restaurant'
    }
}

function loadAllRestaurantsSuccessAction(restaurantsList){
    let restaurants = restaurantsList.map(restaurant => {
        delete restaurant.__v;
        return restaurant;
    });
    return {
        type: RestaurantsActionsConstants.LOAD_ALL_RESTAURANTS_SUCCESS,
        payload: {
            restaurants
        }
    }
}

function loadAllRestaurantsFailureAction(error){
    return {
        type: RestaurantsActionsConstants.LOAD_ALL_RESTAURANTS_FAILURE,
        error: error
    }
}

function resetRestaurantFieldsAction(restaurants) {
    return {
        type: RestaurantsActionsConstants.RESET_RESTAURANT_FIELDS,
        payload: {
            restaurants
        }
    }
}

let RestaurantsActions  = {
    loadAllRestaurantsAction,
    loadAllRestaurantsSuccessAction,
    loadAllRestaurantsFailureAction,
    resetRestaurantFieldsAction,
};

export default RestaurantsActions;
