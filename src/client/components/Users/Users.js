import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import UsersActions from './actions';
import AppActions from '../App/actions';
import { Link } from 'react-router-dom';


class Users extends React.Component {
    componentDidMount() {
        this.props.loadAllUsersEventHandler(this.props.myId);
    }

    render() {
        return (
            <div className="users-root" align="center">

                <br/>
                <label>Search</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <AutoComplete
                    dropdown={true}
                    placeholder="Name"
                    value={this.props.searchUserFirstName}
                    onChange={(e) => this.props.updateSearchUserFieldEventHandler(e, 'searchUserFirstName')}
                    suggestions={this.props.suggestedUsersFirstName}
                    completeMethod={(e) => this.props.getSuggestedUsersFirstNameEventHandler(e, this.props.users.map(user => user.firstName))}
                    autoComplete="off"
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <AutoComplete
                    dropdown={true}
                    placeholder="Username"
                    value={this.props.searchUserUsername}
                    onChange={(e) => this.props.updateSearchUserFieldEventHandler(e, 'searchUserUsername')}
                    suggestions={this.props.suggestedUsersUsername}
                    completeMethod={(e) => this.props.getSuggestedUsersUsernameEventHandler(e, this.props.users.map(user => user.username))}
                    autoComplete="off"
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <AutoComplete
                    dropdown={true}
                    placeholder="Location"
                    value={this.props.searchUserLocation}
                    onChange={(e) => this.props.updateSearchUserFieldEventHandler(e,'searchUserLocation')}
                    suggestions={this.props.suggestedCities}
                    completeMethod={(e) => this.props.getSuggestedCitiesEventHandler(e, this.props.locations.map(location => location.city))}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                    label="Search"
                    icon="pi pi-search"
                    onClick={() => this.props.searchUsersEventHandler(this.props.searchUserFirstName, this.props.searchUserUsername,
                        this.props.searchUserLocation, this.props.myId)
                    }
                />
                <br/>

                {this.props.searchUsers.map((user, index) =>
                    <Card key={index}>
                        <img src={user.picture.pictureData} width="150" height="100" />
                        <Card.Content>
                            <Card.Header>{user.username}</Card.Header>
                            <Card.Meta>
                                <span>{user.firstName} {user.lastName}</span>
                            </Card.Meta>
                            <Card.Description>
                                {user.location.city}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Link to={"/userReviews/"+user._id}>
                                <button type="button">
                                    Show Reviews
                                </button>
                            </Link>
                        </Card.Content>
                    </Card>
                )}
                <br/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        locations: state['app'].get('locations'),
        suggestedCities: state['app'].get('suggestedCities'),
        myId: state['profile'].get('_id'),
        restaurants: state['restaurants'].get('restaurants'),
        users: state['users'].get('users'),
        searchUsers: state['users'].get('searchUsers'),
        searchUserFirstName: state['users'].get('searchUserFirstName'),
        searchUserUsername: state['users'].get('searchUserUsername'),
        searchUserLocation: state['users'].get('searchUserLocation'),
        suggestedUsersFirstName: state['users'].get('suggestedUsersFirstName'),
        suggestedUsersUsername: state['users'].get('suggestedUsersUsername'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadAllUsersEventHandler: (myId) => {
            dispatch(UsersActions.loadAllUsersAction(myId));
        },
        updateSearchUserFieldEventHandler: (e, field) =>{
            dispatch(UsersActions.updateSearchUserFieldAction(e.target.value, field));
        },
        getSuggestedUsersFirstNameEventHandler: (e, usersFirstName) => {
            dispatch(UsersActions.getSuggestedUsersFirstNameAction(e.query, usersFirstName));
        },
        getSuggestedUsersUsernameEventHandler: (e, usersUsername) => {
            dispatch(UsersActions.getSuggestedUsersUsernameAction(e.query, usersUsername));
        },
        getSuggestedCitiesEventHandler: (e, cities) => {
            dispatch(AppActions.getSuggestedCitiesAction(e.query, cities));
        },
        searchUsersEventHandler: (firstName, username, location, myId) => {
            dispatch(UsersActions.searchUsersAction(firstName, username, location, myId));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);