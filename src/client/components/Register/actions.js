import { RegisterActionsConstants} from './constants.js';


function resetRegisterFieldsAction(){
    return {
        type: RegisterActionsConstants.RESET_REGISTER_FIELDS,
    }
}

function updateRegisterFieldAction(field, value){
    return {
        type: RegisterActionsConstants.UPDATE_REGISTER_FIELD,
        payload: {
            field,
            value,
        }
    }
}

function checkRegisterUsernameAction(username){
    return {
        type: RegisterActionsConstants.CHECK_REGISTER_USERNAME,
        uri: '/api/user/check_register_username',
        payload: {
            username,
        }
    }
}

function checkRegisterUsernameSuccessAction(user){
    return {
        type: RegisterActionsConstants.CHECK_REGISTER_USERNAME_SUCCESS,
        payload: {
            invalidRegisterUsername: user !== null
        }
    }
}

function checkRegisterUsernameFailureAction(error) {
    return {
        type: RegisterActionsConstants.CHECK_REGISTER_USERNAME_FAILURE,
        error: error
    }
}

function registerAction(firstName, lastName, username, password, location, picture, locations, invalidRegisterUsername){
    let invalidRegisterInput = (!firstName || !lastName || !username || !password || !location || !picture.pictureType);
    let invalidRegisterLocation = !locations.map(loc => loc.city).includes(location);
    if(invalidRegisterInput || invalidRegisterLocation || invalidRegisterUsername){
        return {
            type: RegisterActionsConstants.INVALID_REGISTER_INPUT,
            payload: {
                invalidRegisterInput,
                invalidRegisterLocation,
            }
        }
    }
    else {
        let userLocation = locations.find(loc => loc.city === location);
        return {
            type: RegisterActionsConstants.REGISTER,
            uri: '/api/user/register',
            payload: {
                firstName,
                lastName,
                username,
                password,
                location: {city: userLocation.city, x: userLocation.x, y: userLocation.y},
                picture,
            }
        }
    }
}

function registerSuccessAction(res) {
    if(res.success === true){
        delete res.user.__v;
        return {
            type: RegisterActionsConstants.REGISTER_SUCCESS,
            payload: {
                ...res.user
            }
        }
    }
    else{
        return {
            type: RegisterActionsConstants.REGISTER_FAILURE,
            error: 'username already exist!'
        }
    }
}

function registerFailureAction(error) {
    return {
        type: RegisterActionsConstants.REGISTER_FAILURE,
        error: error
    }
}

let RegisterActions  = {
    resetRegisterFieldsAction,
    updateRegisterFieldAction,
    checkRegisterUsernameAction,
    checkRegisterUsernameSuccessAction,
    checkRegisterUsernameFailureAction,
    registerAction,
    registerSuccessAction,
    registerFailureAction,
};

export default RegisterActions;