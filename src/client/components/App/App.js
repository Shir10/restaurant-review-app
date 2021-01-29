import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory as history} from 'history';
import AppActions from './actions';
import RestaurantsActions from '../Restaurants/actions';
import TopBar from '../TopBar/TopBar';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Restaurants from '../Restaurants/Restaurants';
import Restaurant from '../Restaurant/Restaurant';
import UserReviews from '../UserReviews/UserReviews';
import Users from '../Users/Users';


class App extends React.Component {
    componentDidMount() {
        this.props.loadAllLocationsEventHandler();
        this.props.loadAllRestaurantsEventHandler();
        this.props.getCurrentUserEventHandler();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.isConnected && this.props.isConnected) {
            this.props.getCurrentUserEventHandler();
        }
    }

    render() {
        if(!this.props.isLoaded){
            return 'loading...';
        }

        return (
            <BrowserRouter history={history()}>
                <div className="app-root">
                    <h1>Fast-Food Review</h1>
                    <TopBar/>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/restaurants" component={Restaurants} />
                        <Route path="/restaurant/:id" component={Restaurant} />
                        <Route path="/userReviews/:id" component={UserReviews} />
                        <Route path="/users" component={Users} />
                        <Route path="/profile" component={Profile} />
                        <Redirect exact={true} from="/" to={!this.props.isConnected ? "/login" : "/restaurants"} />
                        {/*<Route component={NotFound} />*/}
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isConnected: state['app'].get('isConnected'),
        isLoaded: state['app'].get('isLoaded'),
        locations: state['app'].get('locations'),
        activeMenuItem: state['topBar'].get('activeMenuItem'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadAllLocationsEventHandler: () => {
            dispatch(AppActions.loadAllLocationsAction());
        },
        getCurrentUserEventHandler: () => {
            dispatch(AppActions.getCurrentUserAction())
        },
        loadAllRestaurantsEventHandler: () => {
            dispatch(RestaurantsActions.loadAllRestaurantsAction());
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);