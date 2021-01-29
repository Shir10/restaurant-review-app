import initialState from '../../initialState';
import { ProfileActionsConstants } from './constants';
import { AppActionsConstants } from '../App/constants';


const ProfileReducer = (state = initialState.profile, action) => {
    console.log('ProfileReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case AppActionsConstants.GET_CURRENT_USER_SUCCESS:
            return state.set('_id', action.payload._id).set('firstName', action.payload.firstName)
                .set('lastName', action.payload.lastName).set('username', action.payload.username)
                .set('password', action.payload.password).set('location', action.payload.location)
                .set('picture', action.payload.picture).set('invalidProfileUsername', false)
                .set('invalidProfileLocation', false).set('invalidProfileInput', false).set('hasUpdated', false);
        case ProfileActionsConstants.UPDATE_PROFILE_FIELD:
            return state.set(action.payload.field, action.payload.value);
        case ProfileActionsConstants.CHECK_PROFILE_USERNAME_SUCCESS:
            return state.set('invalidProfileUsername', action.payload.invalidProfileUsername).set('hasUpdated', false);
        case ProfileActionsConstants.INVALID_PROFILE_INPUT:
            return state.set('invalidProfileLocation', action.payload.invalidProfileLocation)
                .set('invalidProfileInput', action.payload.invalidProfileInput).set('hasUpdated', false);
        case ProfileActionsConstants.UPDATE_PROFILE_SUCCESS:
            return state.set('username', action.payload.username).set('location', action.payload.location)
                .set('invalidProfileUsername', false).set('invalidProfileLocation', false)
                .set('invalidProfileInput', false).set('hasUpdated', true);
        case ProfileActionsConstants.UPDATE_PROFILE_FAILURE:
            return state.set('invalidProfileUsername', true).set('invalidProfileLocation', false)
                .set('invalidProfileInput', false).set('hasUpdated', false);
        default: //otherwise state is lost!
            return state;
    }
};

export default ProfileReducer;