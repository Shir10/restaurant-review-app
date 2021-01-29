import initialState from '../../initialState';
import { CreateModifyReviewActionsConstants } from './constants.js';
import { RestaurantActionsConstants } from '../Restaurant/constants.js';
import { UserReviewsActionsConstants } from '../UserReviews/constants';


const CreateModifyReviewReducer = (state = initialState.createModifyReview, action) => {
    console.log('CreateModifyReviewReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case CreateModifyReviewActionsConstants.CREATE_MODIFY_UPDATE_FIELD:
            return state.set(action.payload.field, action.payload.value);
        case RestaurantActionsConstants.OPEN_ADD_REVIEW:
            return state.set('visibleCreateModifyReview', true);
        case CreateModifyReviewActionsConstants.CLOSE_CREATE_MODIFY_REVIEW:
            return state.set('visibleCreateModifyReview', false).set('reviewBathroom', 0).set('reviewStaff', 0)
                .set('reviewCleanliness', 0).set('reviewDriveThru', 0).set('reviewDelivery', 0).set('reviewFood', 0)
                .set('pic1', {pictureType: '', pictureData: []}).set('pic2', {pictureType: '', pictureData: []});
        case CreateModifyReviewActionsConstants.CREATE_MODIFY_REVIEW_SCORE:
            return state.set(action.payload.category, action.payload.score);
        case CreateModifyReviewActionsConstants.SUBMIT_ADD_REVIEW:
            return state.set('visibleCreateModifyReview', false).set('invalidCreateModifyReview', false);
        case CreateModifyReviewActionsConstants.INVALID_CREATE_MODIFY_REVIEW:
            return state.set('invalidCreateModifyReview', true);
        case UserReviewsActionsConstants.OPEN_MODIFY_REVIEW:
            return state.set('visibleCreateModifyReview', true).set('reviewId', action.payload.review._id)
                .set('reviewBathroom', action.payload.review.categories.bathroomQuality)
                .set('reviewStaff', action.payload.review.categories.staffKindness)
                .set('reviewCleanliness', action.payload.review.categories.cleanliness)
                .set('reviewDriveThru', action.payload.review.categories.driveThruQuality)
                .set('reviewDelivery', action.payload.review.categories.deliverySpeed)
                .set('reviewFood', action.payload.review.categories.foodQuality);
        case CreateModifyReviewActionsConstants.SUBMIT_EDIT_REVIEW:
            return state.set('visibleCreateModifyReview', false);
        default: //otherwise state is lost!
            return state;
    }
};

export default CreateModifyReviewReducer;