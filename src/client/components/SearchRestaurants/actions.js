import { SearchRestaurantsActionsConstants } from '../SearchRestaurants/constants';


function searchRestaurantNameAction(searchRestaurantName){
    return {
        type: SearchRestaurantsActionsConstants.SEARCH_RESTAURANT_NAME,
        payload: {
            searchRestaurantName
        }
    }
}

function searchRestaurantLocationAction(searchRestaurantLocation){
    return {
        type: SearchRestaurantsActionsConstants.SEARCH_RESTAURANT_LOCATION,
        payload: {
            searchRestaurantLocation
        }
    }
}

function searchRestaurantScoreAction(searchRestaurantScore){
    return {
        type: SearchRestaurantsActionsConstants.SEARCH_RESTAURANT_SCORE,
        payload: {
            searchRestaurantScore
        }
    }
}

function searchRestaurantCloserBetterAction(searchRestaurantCloserBetter){
    return {
        type: SearchRestaurantsActionsConstants.SEARCH_RESTAURANT_CLOSER_BETTER,
        payload: {
            searchRestaurantCloserBetter
        }
    }
}

function searchRestaurantsAction(name, location, reviewsAverage, closerBetter, myLocation, locations){
    let query = {$and: []};

    if(name !== "") {
        query.$and.push({name: name});
    }
    if(location !== "") {
        query.$and.push({"location.city": location});
    }
    if(reviewsAverage !== 0) {
        query.$and.push({reviewsAverage: {$gt: reviewsAverage}});
    }
    if(query.$and.length === 0){
        query.$and.push({});
    }

    return {
        type: SearchRestaurantsActionsConstants.SEARCH_RESTAURANTS,
        uri: '/api/restaurant/search_restaurants',
        payload: {
            closerBetter,
            myLocation,
            locations,
            query,
        }
    }
}

function searchRestaurantsSuccessAction(restaurants, details){
    let myLocation = details.locations.find(loc => loc.city === details.myLocation);
    function getDistance(myLocation, restLocation){
        return Math.sqrt(Math.pow((myLocation.x - restLocation.x), 2) + Math.pow((myLocation.y - restLocation.y), 2));
    }
    restaurants = details.closerBetter === 'better' ?
        restaurants.sort((elm1, elm2) => (elm1.reviewsAverage < elm2.reviewsAverage) ? 1 : -1) :
        restaurants.sort((elm1, elm2) => (getDistance(myLocation, elm1.location) > getDistance(myLocation, elm2.location)) ? 1 : -1);
    return {
        type: SearchRestaurantsActionsConstants.SEARCH_RESTAURANTS_SUCCESS,
        payload: {
            restaurants
        }
    }
}

function searchRestaurantsFailureAction(error){
    return {
        type: SearchRestaurantsActionsConstants.SEARCH_RESTAURANTS_FAILURE,
        error: error
    }
}

function getSuggestedRestaurantsNamesAction(prefixName, restaurantsNames){
    let suggestedRestaurantsNames = restaurantsNames.filter(rest => rest.toLowerCase().startsWith(prefixName.toLowerCase()));
    return {
        type: SearchRestaurantsActionsConstants.GET_SUGGESTED_RESTAURANTS_NAMES,
        payload: {
            suggestedRestaurantsNames,
        }
    }
}

let SearchRestaurantsActions  = {
    searchRestaurantNameAction,
    searchRestaurantLocationAction,
    searchRestaurantScoreAction,
    searchRestaurantCloserBetterAction,
    searchRestaurantsAction,
    searchRestaurantsSuccessAction,
    searchRestaurantsFailureAction,
    getSuggestedRestaurantsNamesAction,
};

export default SearchRestaurantsActions;