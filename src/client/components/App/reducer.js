import initialState from '../../initialState';
import { List } from 'immutable';
import { AppActionsConstants } from './constants.js';
import { RegisterActionsConstants } from "../Register/constants";
import { LoginActionsConstants } from "../Login/constants";
import { TopBarActionsConstants } from "../TopBar/constants";


const AppReducer = (state = initialState.app, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case AppActionsConstants.LOAD_ALL_LOCATIONS_SUCCESS:
            return state.set('locations', new List(action.payload.locations));
        case AppActionsConstants.GET_CURRENT_USER_SUCCESS:
            return state.set('isLoaded', true).set('isConnected', true);
        case AppActionsConstants.GET_CURRENT_USER_FAILURE:
            return state.set('isLoaded', true);
        case AppActionsConstants.GET_SUGGESTED_CITIES:
            return state.set('suggestedCities', action.payload.suggestedCities.toArray());
        case RegisterActionsConstants.REGISTER_SUCCESS:
        case LoginActionsConstants.LOGIN_SUCCESS:
            return state.set('isConnected', true);
        case TopBarActionsConstants.LOGOUT_SUCCESS:
            return state.set('isConnected', false);
        default: //otherwise state is lost!
            return state;
    }
};

export default AppReducer;