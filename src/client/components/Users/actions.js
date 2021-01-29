import { UsersActionsConstants } from './constants.js';


function loadAllUsersAction(myId) {
    return {
        type: UsersActionsConstants.LOAD_ALL_USERS,
        uri: '/api/user/users',
        payload: {
            myId
        }
    }
}

function loadAllUsersSuccessAction(users, details){
    let usersList = users
        .sort((user1, user2) => (user1.username > user2.username) ? 1 : -1)
        .filter(user => user._id !== details.myId)
        .map(user => {
            delete user.__v;
            return {
                ...user
            }
        });
    return {
        type: UsersActionsConstants.LOAD_ALL_USERS_SUCCESS,
        payload: {
            users: usersList
        }
    }
}

function loadAllUsersFailureAction(error){
    return {
        type: UsersActionsConstants.LOAD_ALL_USERS_FAILURE,
        error: error
    }
}

function updateSearchUserFieldAction(value, field) {
    return {
        type: UsersActionsConstants.UPDATE_SEARCH_USER_FIELD,
        payload: {
            field,
            value
        }
    }
}

function getSuggestedUsersFirstNameAction(prefixFirstName, usersFirstName){
    let suggestedUsersFirstName = usersFirstName.filter(userFN => userFN.toLowerCase().startsWith(prefixFirstName.toLowerCase()));
    return {
        type: UsersActionsConstants.GET_SUGGESTED_USERS_FIRST_NAME,
        payload: {
            suggestedUsersFirstName
        }
    }
}

function getSuggestedUsersUsernameAction(prefixUsername, usersUsername){
    let suggestedUsersUsername = usersUsername.filter(username => username.toLowerCase().startsWith(prefixUsername.toLowerCase()));
    return {
        type: UsersActionsConstants.GET_SUGGESTED_USERS_USERNAME,
        payload: {
            suggestedUsersUsername,
        }
    }
}

function searchUsersAction(firstName, username, location, myId){
    let query = {$and: []};

    if(firstName !== "") {
        query.$and.push({firstName: firstName});
    }
    if(username !== "") {
        query.$and.push({username: username});
    }
    if(location !== "") {
        query.$and.push({"location.city": location});
    }
    if(query.$and.length === 0){
        return {
            type: UsersActionsConstants.LOAD_ALL_USERS,
            uri: '/api/user/users',
            payload: {
                myId
            }
        }
    }
    return {
        type: UsersActionsConstants.SEARCH_USERS,
        uri: '/api/user/search_users',
        payload: {
            query
        }
    }
}

function searchUsersSuccessAction(users){
    users = users.sort((elm1, elm2) => (elm1.username > elm2.username) ? 1 : -1);
    return {
        type: UsersActionsConstants.SEARCH_USERS_SUCCESS,
        payload: {
            users
        }
    }
}

function searchUsersFailureAction(error){
    return {
        type: UsersActionsConstants.SEARCH_USERS_FAILURE,
        error: error
    }
}

let UsersActions  = {
    loadAllUsersAction,
    loadAllUsersSuccessAction,
    loadAllUsersFailureAction,
    updateSearchUserFieldAction,
    getSuggestedUsersFirstNameAction,
    getSuggestedUsersUsernameAction,
    searchUsersAction,
    searchUsersSuccessAction,
    searchUsersFailureAction,
};

export default UsersActions;