import { RestaurantActionsConstants } from './constants.js';
import { List } from "immutable";


function loadRestaurantAction(_id) {
    return {
        type: RestaurantActionsConstants.LOAD_RESTAURANT,
        uri: '/api/restaurant/' + _id,
    }
}

function loadRestaurantSuccessAction(res){
    let restaurantReviews = res.restaurantReviews.map(review => {
        delete review.__v;
        return review;
    });
    return {
        type: RestaurantActionsConstants.LOAD_RESTAURANT_SUCCESS,
        payload: {
            restaurant: res.restaurant,
            restaurantReviews: List(restaurantReviews),
        }
    }
}

function loadRestaurantFailureAction(error){
    return {
        type: RestaurantActionsConstants.LOAD_RESTAURANT_FAILURE,
        error: error
    }
}

function openAddReviewAction() {
    return {
        type: RestaurantActionsConstants.OPEN_ADD_REVIEW,
    }
}

function updateFieldValueAction(value, field){
    return {
        type: RestaurantActionsConstants.UPDATE_FIELD_VALUE,
        payload: {
            value,
            field
        }
    }
}

function sortReviewsByDateAction(sortByDateValue, restaurantReviews){
    let sortedReviews = (sortByDateValue === 'From Newest') ? restaurantReviews.sort((x1, x2) => new Date(x2.date) - new Date(x1.date)) :
        /*(sortByDateValue === 'From Oldest') ?*/ restaurantReviews.sort((x1, x2) => new Date(x1.date) - new Date(x2.date));
        // (sortByDateValue === 'Since Last Week') ?
        // (sortByDateValue === 'Since Last Month') ?
        // (sortByDateValue === 'Since Last Year') ?
    return {
        type: RestaurantActionsConstants.SORT_REVIEWS_BY_DATE,
        payload: {
            sortedReviews
        }
    }
}

function sortReviewsByTopicAction(sortByTopicValue, restaurantReviews){
    let sortedReviews = (sortByTopicValue === 'Bathroom Quality') ?
        restaurantReviews.sort((x1, x2) => x2.categories.bathroomQuality - x1.categories.bathroomQuality) :
        (sortByTopicValue === 'Staff Kindness') ?
            restaurantReviews.sort((x1, x2) => x2.categories.staffKindness - x1.categories.staffKindness) :
            (sortByTopicValue === 'Cleanliness') ?
                restaurantReviews.sort((x1, x2) => x2.categories.cleanliness - x1.categories.cleanliness) :
                (sortByTopicValue === 'Drive-thru quality') ?
                    restaurantReviews.sort((x1, x2) => x2.categories.driveThruQuality - x1.categories.driveThruQuality) :
                    (sortByTopicValue === 'Delivery Speed') ?
                        restaurantReviews.sort((x1, x2) => x2.categories.deliverySpeed - x1.categories.deliverySpeed) :
                        restaurantReviews.sort((x1, x2) => x2.categories.foodQuality - x1.categories.foodQuality);
    return {
        type: RestaurantActionsConstants.SORT_REVIEWS_BY_TOPIC,
        payload: {
            sortedReviews
        }
    }
}

let RestaurantActions  = {
    loadRestaurantAction,
    loadRestaurantSuccessAction,
    loadRestaurantFailureAction,
    openAddReviewAction,
    updateFieldValueAction,
    sortReviewsByDateAction,
    sortReviewsByTopicAction,
};

export default RestaurantActions;