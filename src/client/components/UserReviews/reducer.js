import initialState from '../../initialState';
import { List } from 'immutable';
import { UserReviewsActionsConstants } from './constants';
import { CreateModifyReviewActionsConstants } from '../CreateModifyReview/constants';


const UserReviewsReducer = (state = initialState.userReviews, action) => {
    console.log('UserReviewsReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case UserReviewsActionsConstants.LOAD_USER_REVIEWS_SUCCESS:
            return state.set('userReviews', new List(action.payload.userReviews));
        case UserReviewsActionsConstants.DELETE_REVIEW_SUCCESS:
            return state.set('userReviews', action.payload.userReviews);
        case CreateModifyReviewActionsConstants.SUBMIT_EDIT_REVIEW_SUCCESS:
            return state.set('userReviews', action.payload.userReviews);
        default: //otherwise state is lost!
            return state;
    }
};

export default UserReviewsReducer;