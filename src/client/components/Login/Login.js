import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'primereact/button';
import AppActions from '../App/actions';
import LoginActions from './actions';
import UserForm from '../UserForm/UserForm';


class Login extends React.Component {
    componentDidMount() {
        this.props.resetLoginFieldsEventHandler();
    }

    render() {
        this.fields = [
            {
                tag: 'input',
                type: 'text',
                name: 'username',
                label: 'Username',
                placeholder: 'Username',
                value: this.props.username,
                autoComplete: 'off',
                onChange: (e) => this.props.updateLoginFieldEventHandler(e),
            },
            {
                tag: 'input',
                type: 'password',
                name: 'password',
                label: 'Password',
                placeholder: 'Password',
                value: this.props.password,
                autoComplete: 'off',
                onChange: (e) => this.props.updateLoginFieldEventHandler(e),
            },
        ];

        this.button = {
            tag: 'Button',
            label: 'Login',
            onClick: () => this.props.loginEventHandler(this.props.username, this.props.password)
        };

        this.errorMsgs = [
            this.props.invalidLoginInput && 'All fields are required!',
            this.props.wrongLoginInput && 'Username or password are wrong!'
        ];

        return (
            <div className="login-root">
                <UserForm heading="Login" fields={this.fields} button={this.button} errorMsgs={this.errorMsgs}/>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        username: state['login'].get('username'),
        password: state['login'].get('password'),
        invalidLoginInput: state['login'].get('invalidLoginInput'),
        wrongLoginInput: state['login'].get('wrongLoginInput'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetLoginFieldsEventHandler: () => {
            dispatch(LoginActions.resetLoginFieldsAction());
        },
        updateLoginFieldEventHandler: (e) => {
            dispatch(LoginActions.updateLoginFieldAction(e.target.name, e.target.value));
        },
        getSuggestedCitiesEventHandler: (e, cities) => {
            dispatch(AppActions.getSuggestedCitiesAction(e.query, cities));
        },
        loginEventHandler: (username, password) => {
            dispatch(LoginActions.loginAction(username, password));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);