import { UserReviewsActionsConstants } from './constants.js';


function loadUserReviewsAction(userId, restaurants) {
    return {
        type: UserReviewsActionsConstants.LOAD_USER_REVIEWS,
        uri: '/api/review/user_reviews/' + userId,
        payload: {
            restaurants
        }
    }
}

function loadUserReviewsSuccessAction(reviews, details) {
    let userReviews = reviews.map(review => {
        let restaurant = details.restaurants.find(rest => rest._id === review.restaurantId);
        delete review.__v;
        return {
            ...review,
            restaurantName: restaurant.name,
            restaurantLocation: restaurant.location.city,
            restaurantIsDelivery: restaurant.isDelivery,
            restaurantIsDriveThru: restaurant.isDriveThru,
        };
    });
    return {
        type: UserReviewsActionsConstants.LOAD_USER_REVIEWS_SUCCESS,
        payload: {
            userReviews,
        }
    };
}

function loadUserReviewsFailureAction(error) {
    return {
        type: UserReviewsActionsConstants.LOAD_USER_REVIEWS_FAILURE,
        error: error
    }
}

function openModifyReviewAction(review) {
    return {
        type: UserReviewsActionsConstants.OPEN_MODIFY_REVIEW,
        payload: {
            review
        }
    }
}

function deleteReviewAction(review, restaurants, userReviews){
    return {
        type: UserReviewsActionsConstants.DELETE_REVIEW,
        uri: '/api/review/delete_review',
        payload: {
            review,
            restaurants,
            userReviews,
        }
    }
}

function deleteReviewSuccessAction(res, details){
    const userReviews = details.userReviews.filter(review => review._id !== details.review._id);
    const restaurants = details.restaurants.map(rest => {
        if (rest._id === details.review.restaurantId) {
            rest.reviewsAverage = res.restaurantAvg;
        }
        return rest;
    });
    return {
        type: UserReviewsActionsConstants.DELETE_REVIEW_SUCCESS,
        payload: {
            userReviews,
            restaurants
        }
    }
}

function deleteReviewFailureAction(error){
    return {
        type: UserReviewsActionsConstants.DELETE_REVIEW_FAILURE,
        error: error
    }
}

let UserReviewsActions  = {
    loadUserReviewsAction,
    loadUserReviewsSuccessAction,
    loadUserReviewsFailureAction,
    openModifyReviewAction,
    deleteReviewAction,
    deleteReviewSuccessAction,
    deleteReviewFailureAction,
};

export default UserReviewsActions;