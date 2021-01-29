import { ProfileActionsConstants } from './constants.js';


function updateProfileFieldAction(field, value){
    return {
        type: ProfileActionsConstants.UPDATE_PROFILE_FIELD,
        payload: {
            field,
            value,
        }
    }
}

function checkProfileUsernameAction(_id, username) {
    return {
        type: ProfileActionsConstants.CHECK_PROFILE_USERNAME,
        uri: '/api/user/check_profile_username',
        payload: {
            _id,
            username,
        }
    }
}

function checkProfileUsernameSuccessAction(res){
    return {
        type: ProfileActionsConstants.CHECK_PROFILE_USERNAME_SUCCESS,
        payload: {
            invalidProfileUsername: !res.success
        }
    }
}

function checkProfileUsernameFailureAction(error) {
    return {
        type: ProfileActionsConstants.CHECK_PROFILE_USERNAME_FAILURE,
        error: error
    }
}

function UpdateProfileAction(_id, username, location, locations, invalidProfileUsername){
    let invalidProfileInput = (!username || !location);
    let invalidProfileLocation = !locations.map(loc => loc.city).includes(location);
    if(invalidProfileInput || invalidProfileLocation || invalidProfileUsername){
        return {
            type: ProfileActionsConstants.INVALID_PROFILE_INPUT,
            payload: {
                invalidProfileLocation,
                invalidProfileInput,
            }
        }
    }
    else {
        let userLocation = locations.find(loc => loc.city === location);
        return {
            type: ProfileActionsConstants.UPDATE_PROFILE,
            uri: '/api/user/update_user/' + _id,
            payload: {
                username,
                location: userLocation,
            }
        }
    }
}

function updateProfileSuccessAction(res, userDetails) {
    if(res.success === true){
        return {
            type: ProfileActionsConstants.UPDATE_PROFILE_SUCCESS,
            payload: {
                username: userDetails.username,
                location: userDetails.location.city,
            }
        }
    }
    else{
        return {
            type: ProfileActionsConstants.UPDATE_PROFILE_FAILURE,
            error: 'username already exist!'
        }
    }
}

function updateProfileFailureAction(error) {
    return {
        type: ProfileActionsConstants.UPDATE_PROFILE_FAILURE,
        error: error
    }
}

let ProfileActions  = {
    updateProfileFieldAction,
    checkProfileUsernameAction,
    checkProfileUsernameSuccessAction,
    checkProfileUsernameFailureAction,
    UpdateProfileAction,
    updateProfileSuccessAction,
    updateProfileFailureAction,
};

export default ProfileActions;