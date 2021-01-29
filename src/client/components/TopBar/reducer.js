import initialState from '../../initialState';
import { TopBarActionsConstants } from './constants.js';
import { RegisterActionsConstants } from "../Register/constants";
import { LoginActionsConstants } from "../Login/constants";


const TopBarReducer = (state = initialState.topBar, action) => {
    console.log('TopBarReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case TopBarActionsConstants.UPDATE_ACTIVE_MENU_ITEM:
            return state.set('activeMenuItem', action.payload.menuItem);
        case RegisterActionsConstants.REGISTER_SUCCESS:
        case LoginActionsConstants.LOGIN_SUCCESS:
            return state.set('activeMenuItem', 'Restaurants');
        case TopBarActionsConstants.LOGOUT_SUCCESS:
            return state.set('activeMenuItem', 'Login');
        default: //otherwise state is lost!
            return state;
    }
};

export default TopBarReducer;