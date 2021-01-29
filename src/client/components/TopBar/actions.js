import { TopBarActionsConstants} from './constants.js';


function updateActiveMenuItemAction(menuItem) {
    return {
        type: TopBarActionsConstants.UPDATE_ACTIVE_MENU_ITEM,
        payload: {
            menuItem,
        }
    }
}

function logoutAction() { // goes to TopBarReducer and UserReducer
    return {
        type: TopBarActionsConstants.LOGOUT,
        uri: '/api/user/logout',
    }
}

function logoutSuccessAction() {
    return {
        type: TopBarActionsConstants.LOGOUT_SUCCESS,
    }
}

function logoutFailureAction(error) {
    return {
        type: TopBarActionsConstants.LOGOUT_FAILURE,
        error: error
    }
}


let TopBarActions  = {
    updateActiveMenuItemAction,
    logoutAction,
    logoutSuccessAction,
    logoutFailureAction,
};

export default TopBarActions;