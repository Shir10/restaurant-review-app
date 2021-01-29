import { CreateModifyReviewActionsConstants } from './constants.js';


function closeCreateModifyReviewAction() {
    return {
        type: CreateModifyReviewActionsConstants.CLOSE_CREATE_MODIFY_REVIEW,
    }
}

function CreateModifyReviewScoreAction(score, category){
    return {
        type: CreateModifyReviewActionsConstants.CREATE_MODIFY_REVIEW_SCORE,
        payload: {
            score,
            category
        }
    }
}

function submitAddReviewAction(bathroomQuality, staffKindness, cleanliness, driveThruQuality, deliverySpeed, foodQuality, restaurantId, myId, pic1, pic2){
    return {
        type: CreateModifyReviewActionsConstants.SUBMIT_ADD_REVIEW,
        uri: '/api/review/add_review',
        payload: {
            review: {
                categories: {
                    bathroomQuality,
                    staffKindness,
                    cleanliness,
                    driveThruQuality,
                    deliverySpeed,
                    foodQuality,
                },
                pic1,
                pic2,
                restaurantId,
                userId: myId,
                date: new Date(),
            }
        }
    }
}

function submitAddReviewSuccessAction(res){
    const { review } = res;
    delete review.__v;
    return {
        type: CreateModifyReviewActionsConstants.SUBMIT_ADD_REVIEW_SUCCESS,
        payload: {
            review
        }
    }
}

function submitAddReviewFailureAction(error){
    return {
        type: CreateModifyReviewActionsConstants.SUBMIT_ADD_REVIEW_FAILURE,
        error: error
    }
}

function invalidCreateModifyReviewAction(){
    return {
        type: CreateModifyReviewActionsConstants.INVALID_CREATE_MODIFY_REVIEW,
    }
}

function submitEditReviewAction(reviewId, bathroomQuality, staffKindness, cleanliness, driveThruQuality, deliverySpeed, foodQuality, restaurantId, restaurantName, restaurantCity, myId, restaurants, userReviews, pic1, pic2){
    return {
        type: CreateModifyReviewActionsConstants.SUBMIT_EDIT_REVIEW,
        uri: '/api/review/update_review',
        payload: {
            review: {
                _id: reviewId,
                categories: {
                    bathroomQuality,
                    staffKindness,
                    cleanliness,
                    driveThruQuality,
                    deliverySpeed,
                    foodQuality,
                },
                restaurantId,
                userId: myId,
                date: new Date(),
                restaurantName,
                restaurantLocation: restaurantCity,
                pic1,
                pic2,
            },
            restaurants,
            userReviews,
        }
    }
}

function submitEditReviewSuccessAction(res, details){
    const { review, restaurantAvg } = res;

    const restaurants = details.restaurants.map(restaurant => {
        if (restaurant._id === review._id) {
            restaurant.reviewsAverage = restaurantAvg;
        }
        return restaurant;
    });
    const userReviews = details.userReviews.map(userReview => {
        if(userReview._id === review._id){
            return review;
        }
        return userReview;
    });
    return {
        type: CreateModifyReviewActionsConstants.SUBMIT_EDIT_REVIEW_SUCCESS,
        payload: {
            restaurants,
            userReviews
        }
    }
}

function submitEditReviewFailureAction(error){
    return {
        type: CreateModifyReviewActionsConstants.SUBMIT_EDIT_REVIEW_FAILURE,
        error: error
    }
}

function updateCreateModifyReviewFieldEventHandler(field, value){
    return {
        type: CreateModifyReviewActionsConstants.CREATE_MODIFY_UPDATE_FIELD,
        payload: {
            field,
            value,
        }
    }
}

let CreateModifyReviewActions  = {
    closeCreateModifyReviewAction,
    CreateModifyReviewScoreAction,
    submitAddReviewAction,
    submitAddReviewSuccessAction,
    submitAddReviewFailureAction,
    invalidCreateModifyReviewAction,
    submitEditReviewAction,
    submitEditReviewSuccessAction,
    submitEditReviewFailureAction,
    updateCreateModifyReviewFieldEventHandler,
};

export default CreateModifyReviewActions;