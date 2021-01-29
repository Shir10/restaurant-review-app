import { LoginActionsConstants} from './constants.js';


function resetLoginFieldsAction(){
    return {
        type: LoginActionsConstants.RESET_LOGIN_FIELDS,
    }
}

function updateLoginFieldAction(field, value){
    return {
        type: LoginActionsConstants.UPDATE_LOGIN_FIELD,
        payload: {
            field,
            value,
        }
    }
}

function loginAction(username, password){
    let invalidLoginInput = (!username || !password);
    if(invalidLoginInput){
        return {
            type: LoginActionsConstants.INVALID_LOGIN_INPUT,
        }
    }
    else {
        return {
            type: LoginActionsConstants.LOGIN,
            uri: '/api/user/login',
            payload: {
                username,
                password,
            }
        }
    }
}

function loginSuccessAction(res) {
    if(res.success === true){
        delete res.user.__v;
        return {
            type: LoginActionsConstants.LOGIN_SUCCESS,
            payload: {
                ...res.user,
                location: res.user.location.city,
            }
        }
    }
    else{
        return {
            type: LoginActionsConstants.LOGIN_FAILURE,
            error: 'Username or Password are Wrong!'
        }
    }
}

function loginFailureAction(error) {
    return {
        type: LoginActionsConstants.LOGIN_FAILURE,
        error: error
    }
}

let LoginActions  = {
    resetLoginFieldsAction,
    updateLoginFieldAction,
    loginAction,
    loginSuccessAction,
    loginFailureAction,
};

export default LoginActions;