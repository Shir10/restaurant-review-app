import initialState from '../../initialState';
import { RestaurantActionsConstants } from './constants';
import { CreateModifyReviewActionsConstants } from '../CreateModifyReview/constants';
import { UserReviewsActionsConstants } from '../UserReviews/constants';


const RestaurantReducer = (state = initialState.restaurant, action) => {
    console.log('RestaurantReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case RestaurantActionsConstants.LOAD_RESTAURANT_SUCCESS:
            return state.set('selectedRestaurantId', action.payload.restaurant._id).set('selectedRestaurantName', action.payload.restaurant.name)
                .set('selectedRestaurantCity', action.payload.restaurant.location.city).set('selectedRestaurantIsDelivery', action.payload.restaurant.isDelivery)
                .set('selectedRestaurantIsDriveThru', action.payload.restaurant.isDriveThru).set('restaurantReviews', action.payload.restaurantReviews);
        case UserReviewsActionsConstants.OPEN_MODIFY_REVIEW:
            return state.set('selectedRestaurantId', action.payload.review.restaurantId).set('selectedRestaurantName', action.payload.review.restaurantName)
                .set('selectedRestaurantCity', action.payload.review.restaurantLocation).set('selectedRestaurantIsDelivery', action.payload.review.restaurantIsDelivery)
                .set('selectedRestaurantIsDriveThru', action.payload.review.restaurantIsDriveThru);
        case CreateModifyReviewActionsConstants.SUBMIT_ADD_REVIEW_SUCCESS:
            return state.update('restaurantReviews', e => e.push(action.payload.review));
        case RestaurantActionsConstants.UPDATE_FIELD_VALUE:
            return state.set(action.payload.field, action.payload.value);
        case RestaurantActionsConstants.SORT_REVIEWS_BY_DATE:
            return state.set('restaurantReviews', action.payload.sortedReviews);
        case RestaurantActionsConstants.SORT_REVIEWS_BY_TOPIC:
            return state.set('restaurantReviews', action.payload.sortedReviews);
        default: //otherwise state is lost!
            return state;
    }
};

export default RestaurantReducer;