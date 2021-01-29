import initialState from '../../initialState';
import { UsersActionsConstants } from './constants.js';
import { List } from 'immutable';


const UsersReducer = (state = initialState.users, action) => {
    console.log('UsersReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case UsersActionsConstants.LOAD_ALL_USERS_SUCCESS:
            return state.set('users', new List(action.payload.users)).set('searchUsers', new List(action.payload.users))
                .set('showUserReviews', false);
        case UsersActionsConstants.UPDATE_SEARCH_USER_FIELD:
            return state.set(action.payload.field, action.payload.value);
        case UsersActionsConstants.GET_SUGGESTED_USERS_FIRST_NAME:
            return state.set('suggestedUsersFirstName', action.payload.suggestedUsersFirstName.toArray());
        case UsersActionsConstants.GET_SUGGESTED_USERS_USERNAME:
            return state.set('suggestedUsersUsername', action.payload.suggestedUsersUsername.toArray());
        case UsersActionsConstants.SEARCH_USERS_SUCCESS:
            return state.set('searchUsers', new List(action.payload.users));
        default: //otherwise state is lost!
            return state;
    }
};

export default UsersReducer;