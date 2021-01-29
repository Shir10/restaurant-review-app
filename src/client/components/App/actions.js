import { AppActionsConstants } from './constants.js';


function loadAllLocationsAction() {
    return {
        type: AppActionsConstants.LOAD_ALL_LOCATIONS,
        uri: '/api/load/locations'
    }
}

function loadAllLocationsSuccessAction(locations){
    return {
        type: AppActionsConstants.LOAD_ALL_LOCATIONS_SUCCESS,
        payload: {
            locations
        }
    }
}

function loadAllLocationsFailureAction(error){
    return {
        type: AppActionsConstants.LOAD_ALL_LOCATIONS_FAILURE,
        error: error
    }
}

function getSuggestedCitiesAction(prefixLocation, cities){
    let suggestedCities = cities.filter(city => city.toLowerCase().startsWith(prefixLocation.toLowerCase()));
    return {
        type: AppActionsConstants.GET_SUGGESTED_CITIES,
        payload: {
            suggestedCities
        }
    }
}

function getCurrentUserAction() {
    return {
        type: AppActionsConstants.GET_CURRENT_USER,
        uri: '/api/user/current',
    }
}

function getCurrentUserSuccessAction(res) {
    return {
        type: AppActionsConstants.GET_CURRENT_USER_SUCCESS,
        payload: {
            ...res.user,
            location: res.user.location.city,
        }
    }
}

function getCurrentUserFailureAction(error) {
    return {
        type: AppActionsConstants.GET_CURRENT_USER_FAILURE,
        error: error
    }
}

let AppActions  = {
    loadAllLocationsAction,
    loadAllLocationsSuccessAction,
    loadAllLocationsFailureAction,
    getSuggestedCitiesAction,
    getCurrentUserAction,
    getCurrentUserSuccessAction,
    getCurrentUserFailureAction

};

export default AppActions;