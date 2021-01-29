import React from 'react';
import { connect } from 'react-redux';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import AppActions from '../App/actions';
import RegisterActions from './actions';
import UserForm from '../UserForm/UserForm';


class Register extends React.Component {
    constructor(){
        super();
        this.fileHandler = this.fileHandler.bind(this);
    }

    componentDidMount() {
        this.props.resetRegisterFieldsEventHandler();
    }

    fileHandler(e) {
        const file = e.target.files[0];
        let fs = new FileReader();
        fs.onloadend = () => {
            let pictureData = fs.result;
            let value = {
                pictureType: file.type,
                pictureData: pictureData,
            };
            this.props.updateRegisterFieldEventHandler(e, {name:'picture' ,value: value});
        };
        fs.readAsDataURL(file);
    }

    render() {
        this.fields = [
            {
                tag: 'input',
                type: 'text',
                name: 'firstName',
                label: 'First Name',
                placeholder: 'First Name',
                value: this.props.firstName,
                autoComplete: 'off',
                onChange: (e) => this.props.updateRegisterFieldEventHandler(e)
            },
            {
                tag: 'input',
                type: 'text',
                name: 'lastName',
                label: 'Last Name',
                placeholder: 'Last Name',
                value: this.props.lastName,
                autoComplete: 'off',
                onChange: (e) => this.props.updateRegisterFieldEventHandler(e)
            },
            {
                tag: 'input',
                type: 'text',
                name: 'username',
                label: 'Username',
                placeholder: 'Username',
                value: this.props.username,
                autoComplete: 'off',
                onChange: (e) => this.props.updateRegisterFieldEventHandler(e),
                onBlur: () => this.props.checkRegisterUsernameEventHandler(this.props.username),
                errorMsg: this.props.invalidRegisterUsername && 'Username already exists!'
            },
            {
                tag: 'input',
                type: 'password',
                name: 'password',
                label: 'Password',
                placeholder: 'Password',
                value: this.props.password,
                autoComplete: 'off',
                onChange: (e) => this.props.updateRegisterFieldEventHandler(e),
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
                onChange: (e) => this.props.updateRegisterFieldEventHandler(e),
                completeMethod: (e) => this.props.getSuggestedCitiesEventHandler(e, this.props.locations.map(location => location.city)),
                errorMsg: this.props.invalidRegisterLocation && 'Invalid location!'
            },
            {
                tag: 'input',
                type: 'file',
                name: 'picture',
                label: 'Picture',
                placeholder: 'Picture',
                accept: 'image/*',
                onChange: this.fileHandler,
            },
        ];

        this.button = {
            tag: 'Button',
            label: 'Register',
            onClick: () => this.props.registerEventHandler(this.props.firstName, this.props.lastName, this.props.username,
                this.props.password, this.props.location, this.props.picture, this.props.locations, this.props.invalidRegisterUsername)
        };

        this.errorMsgs = [
            this.props.invalidRegisterInput && 'All fields are required!'
        ];

        return (
            <div className="register-root">
                <UserForm heading="Register" fields={this.fields} button={this.button} errorMsgs={this.errorMsgs}/>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        locations: state['app'].get('locations'),
        suggestedCities: state['app'].get('suggestedCities'),
        firstName: state['register'].get('firstName'),
        lastName: state['register'].get('lastName'),
        username: state['register'].get('username'),
        password: state['register'].get('password'),
        location: state['register'].get('location'),
        picture: state['register'].get('picture'),
        invalidRegisterUsername: state['register'].get('invalidRegisterUsername'),
        invalidRegisterLocation: state['register'].get('invalidRegisterLocation'),
        invalidRegisterInput: state['register'].get('invalidRegisterInput'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetRegisterFieldsEventHandler: () => {
            dispatch(RegisterActions.resetRegisterFieldsAction());
        },
        updateRegisterFieldEventHandler: (e, data) => {
            if (data){
                dispatch(RegisterActions.updateRegisterFieldAction(data.name, data.value));
            }
            else{
                dispatch(RegisterActions.updateRegisterFieldAction(e.target.name, e.target.value));
            }
        },
        checkRegisterUsernameEventHandler: (username) => {
            dispatch(RegisterActions.checkRegisterUsernameAction(username));
        },
        getSuggestedCitiesEventHandler: (e, cities) => {
            dispatch(AppActions.getSuggestedCitiesAction(e.query, cities));
        },
        registerEventHandler: (firstName, lastName, username, password, location, picture, locations, invalidRegisterUsername) => {
            dispatch(RegisterActions.registerAction(firstName, lastName, username, password, location, picture, locations, invalidRegisterUsername));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);