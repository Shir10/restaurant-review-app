import initialState from '../../initialState';
import { RegisterActionsConstants } from './constants';


const RegisterReducer = (state = initialState.register, action) => {
    console.log('RegisterReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case RegisterActionsConstants.RESET_REGISTER_FIELDS:
            return state.set('firstName', '').set('lastName', '').set('username', '').set('password', '')
                .set('location', '').set('picture', '').set('invalidRegisterUsername', false).set('invalidRegisterLocation', false)
                .set('invalidRegisterInput', false);
        case RegisterActionsConstants.UPDATE_REGISTER_FIELD:
            return state.set(action.payload.field, action.payload.value);
        case RegisterActionsConstants.CHECK_REGISTER_USERNAME_SUCCESS:
            return state.set('invalidRegisterUsername', action.payload.invalidRegisterUsername);
        case RegisterActionsConstants.INVALID_REGISTER_INPUT:
            return state.set('invalidRegisterLocation', action.payload.invalidRegisterLocation)
                .set('invalidRegisterInput', action.payload.invalidRegisterInput);
        case RegisterActionsConstants.REGISTER_FAILURE:
            return state.set('invalidRegisterUsername', true).set('invalidRegisterLocation', false).set('invalidRegisterInput', false);
        default: //otherwise state is lost!
            return state;
    }
};

export default RegisterReducer;