import initialState from '../../initialState';
import { LoginActionsConstants } from './constants';


const LoginReducer = (state = initialState.login, action) => {
    console.log('LoginReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case LoginActionsConstants.RESET_LOGIN_FIELDS:
            return state.set('username', '').set('password', '').set('invalidLoginInput', false).set('wrongLoginInput', false);
        case LoginActionsConstants.UPDATE_LOGIN_FIELD:
            return state.set(action.payload.field, action.payload.value);
        case LoginActionsConstants.INVALID_LOGIN_INPUT:
            return state.set('invalidLoginInput', true).set('wrongLoginInput', false);
        case LoginActionsConstants.LOGIN_FAILURE:
            return state.set('invalidLoginInput', false).set('wrongLoginInput', true);
        default: //otherwise state is lost!
            return state;
    }
};

export default LoginReducer;