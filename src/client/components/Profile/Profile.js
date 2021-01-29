import React from 'react';
import { connect } from 'react-redux';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import AppActions from '../App/actions';
import UserForm from '../UserForm/UserForm';
import ProfileActions from '../Profile/actions';


class Profile extends React.Component {
    componentDidMount() {
        this.props.getCurrentUserEventHandler();
    }

    render() {
        this.picture = {
            tag: 'img',
            name: 'picture',
            src: this.props.picture.pictureData
        };

        this.fields = [
            {
                tag: 'input',
                type: 'text',
                name: 'firstName',
                label: 'First Name',
                placeholder: 'First Name',
                value: this.props.firstName,
                disabled: true
            },
            {
                tag: 'input',
                type: 'text',
                name: 'lastName',
                label: 'Last Name',
                placeholder: 'Last Name',
                value: this.props.lastName,
                disabled: true
            },
            {
                tag: 'input',
                type: 'text',
                name: 'username',
                label: 'Username',
                placeholder: 'Username',
                value: this.props.username,
                autoComplete: 'off',
                onChange: (e) => this.props.updateProfileFieldEventHandler(e),
                onBlur: () => this.props.checkProfileUsernameEventHandler(this.props._id, this.props.username, this.props.invalidProfileUsername),
                errorMsg: this.props.invalidProfileUsername && 'Username already exists!'
            },
            {
                tag: 'input',
                type: 'password',
                name: 'password',
                label: 'Password',
                placeholder: 'Password',
                value: this.props.password,
                disabled: true
            },
            {
                tag: 'AutoComplete',
                name: 'location',
                label: 'Location',
                placeholder: 'Location',
                value: this.props.location,
                dropdown: true,
                autoComplete: 'off',
                suggestions: this.props.suggestedCities,
                onChange: (e) => this.props.updateProfileFieldEventHandler(e),
                completeMethod: (e) => this.props.getSuggestedCitiesEventHandler(e, this.props.locations.map(location => location.city)),
                errorMsg: this.props.invalidProfileLocation && 'Invalid location!'
            },
        ];

        this.button = {
            tag: 'Button',
            label: 'Update',
            onClick: () => this.props.UpdateProfileEventHandler(this.props._id, this.props.username,
                this.props.location, this.props.locations)
        };

        this.errorMsgs = [
            this.props.invalidProfileInput && 'All fields are required!',
        ];

        this.successMsg = this.props.hasUpdated && 'Profile was updated successfully!';

        return (
            <div className="profile-root">
                <UserForm picture={this.picture} fields={this.fields} button={this.button} errorMsgs={this.errorMsgs} successMsg={this.successMsg}/>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        locations: state['app'].get('locations'),
        suggestedCities: state['app'].get('suggestedCities'),
        _id: state['profile'].get('_id'),
        firstName: state['profile'].get('firstName'),
        lastName: state['profile'].get('lastName'),
        username: state['profile'].get('username'),
        password: state['profile'].get('password'),
        location: state['profile'].get('location'),
        picture: state['profile'].get('picture'),
        invalidProfileUsername: state['profile'].get('invalidProfileUsername'),
        invalidProfileLocation: state['profile'].get('invalidProfileLocation'),
        invalidProfileInput: state['profile'].get('invalidProfileInput'),
        hasUpdated: state['profile'].get('hasUpdated'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrentUserEventHandler: () => {
            dispatch(AppActions.getCurrentUserAction());
        },
        updateProfileFieldEventHandler: (e) => {
            dispatch(ProfileActions.updateProfileFieldAction(e.target.name, e.target.value));
        },
        checkProfileUsernameEventHandler: (_id, username, invalidProfileUsername) => {
            dispatch(ProfileActions.checkProfileUsernameAction(_id, username, invalidProfileUsername));
        },
        getSuggestedCitiesEventHandler: (e, cities) => {
            dispatch(AppActions.getSuggestedCitiesAction(e.query, cities));
        },
        UpdateProfileEventHandler: (_id, username, location, locations) => {
            dispatch(ProfileActions.UpdateProfileAction(_id, username, location, locations));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);