import { AddRestaurantActionsConstants} from './constants.js';

function openAddRestaurantAction(){
    return {
        type: AddRestaurantActionsConstants.OPEN_ADD_RESTAURANT,
    }
}

function closeAddRestaurantAction() {
    return {
        type: AddRestaurantActionsConstants.CLOSE_ADD_RESTAURANT,
    }
}

function submitAddRestaurantAction(name, location, isDelivery, isDriveThru){
    return {
        type: AddRestaurantActionsConstants.SUBMIT_ADD_RESTAURANT,
        uri: '/api/restaurant/add_restaurant',
        payload: {
            name,
            location: {city: location.city, x: location.x, y: location.y},
            reviewsAverage: 0,
            isDelivery,
            isDriveThru,
        }
    }
}

function submitAddRestaurantSuccessAction(res){
    if(res.success === true){
        const restaurant = res.restaurant;
        delete restaurant.__v;
        return {
            type: AddRestaurantActionsConstants.SUBMIT_ADD_RESTAURANT_SUCCESS,
            payload: {
                restaurant
            }
        }
    }
    else{
        return {
            type: AddRestaurantActionsConstants.SUBMIT_ADD_RESTAURANT_FAILURE,
            error: 'Restaurant already exist!'
        }
    }
}

function submitAddRestaurantFailureAction(error){
    return {
        type: AddRestaurantActionsConstants.SUBMIT_ADD_RESTAURANT_FAILURE,
        error: error
    }
}

function updateAddRestaurantNameAction(addRestaurantName){
    return {
        type: AddRestaurantActionsConstants.UPDATE_ADD_RESTAURANT_NAME,
        payload: {
            addRestaurantName
        }
    }
}

function updateAddRestaurantLocationAction(addRestaurantLocation){
    return {
        type: AddRestaurantActionsConstants.UPDATE_ADD_RESTAURANT_LOCATION,
        payload: {
            addRestaurantLocation
        }
    }
}

function updateAddRestaurantIsDeliveryAction(addRestaurantIsDelivery){
    return {
        type: AddRestaurantActionsConstants.UPDATE_ADD_RESTAURANT_IS_DELIVERY,
        payload: {
            addRestaurantIsDelivery
        }
    }
}

function updateAddRestaurantIsDriveThruAction(addRestaurantIsDriveThru){
    return {
        type: AddRestaurantActionsConstants.UPDATE_ADD_RESTAURANT_IS_DRIVE_THRU,
        payload: {
            addRestaurantIsDriveThru
        }
    }
}

function invalidInputAddRestaurantAction(restaurantName, restaurantLocation, locations){
    let invalidRestaurantName = restaurantName === "";
    let invalidRestaurantLocation = !locations.map(location => location.city).includes(restaurantLocation);
    return {
        type: AddRestaurantActionsConstants.INVALID_INPUT_ADD_RESTAURANT,
        payload: {
            invalidRestaurantName,
            invalidRestaurantLocation
        }
    }
}

let AddRestaurantActions  = {
    openAddRestaurantAction,
    closeAddRestaurantAction,
    submitAddRestaurantAction,
    submitAddRestaurantSuccessAction,
    submitAddRestaurantFailureAction,
    updateAddRestaurantNameAction,
    updateAddRestaurantLocationAction,
    updateAddRestaurantIsDeliveryAction,
    updateAddRestaurantIsDriveThruAction,
    invalidInputAddRestaurantAction,
};

export default AddRestaurantActions
