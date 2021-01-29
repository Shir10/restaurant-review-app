import initialState from '../../initialState';
import { AddRestaurantActionsConstants } from './constants.js';


const AddRestaurantReducer = (state = initialState.addRestaurant, action) => {
    console.log('AddRestaurantReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case AddRestaurantActionsConstants.OPEN_ADD_RESTAURANT:
            return state.set('visibleAddRestaurant', true);
        case AddRestaurantActionsConstants.SUBMIT_ADD_RESTAURANT:
            return state.set('visibleAddRestaurant', false);
        case AddRestaurantActionsConstants.CLOSE_ADD_RESTAURANT:
            return state.set('visibleAddRestaurant', false).set('addRestaurantName', '').set('addRestaurantLocation', '')
                .set('addRestaurantIsDelivery', false).set('addRestaurantIsDriveThru', false)
                .set('invalidRestaurantName', false).set('invalidRestaurantLocation', false);
        case AddRestaurantActionsConstants.UPDATE_ADD_RESTAURANT_NAME:
            return state.set('addRestaurantName', action.payload.addRestaurantName);
        case AddRestaurantActionsConstants.UPDATE_ADD_RESTAURANT_LOCATION:
            return state.set('addRestaurantLocation', action.payload.addRestaurantLocation);
        case AddRestaurantActionsConstants.UPDATE_ADD_RESTAURANT_IS_DELIVERY:
            return state.set('addRestaurantIsDelivery', action.payload.addRestaurantIsDelivery);
        case AddRestaurantActionsConstants.UPDATE_ADD_RESTAURANT_IS_DRIVE_THRU:
            return state.set('addRestaurantIsDriveThru', action.payload.addRestaurantIsDriveThru);
        case AddRestaurantActionsConstants.INVALID_INPUT_ADD_RESTAURANT:
            return state.set('invalidRestaurantName', action.payload.invalidRestaurantName)
                .set('invalidRestaurantLocation', action.payload.invalidRestaurantLocation);
        default: //otherwise state is lost!
            return state;
    }
};

export default AddRestaurantReducer;