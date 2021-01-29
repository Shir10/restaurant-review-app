import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import TopBarActions from './actions';


class TopBar extends React.Component {
    render() {
        const createMenuItem = (tabName, ref, handler) => (
            <Menu.Item
                name={tabName}
                active={this.props.activeMenuItem === tabName}
                as={NavLink}
                to={ref}
                onClick={() => handler(tabName)}
            />
        );

        return (
            <div className="topBar-root">
                {!this.props.isConnected ?
                    <Menu pointing secondary>
                        <Menu.Menu position='right'>
                            {createMenuItem('Register', '/register', this.props.updateActiveMenuItemEventHandler)}
                            {createMenuItem('Login', '/login', this.props.updateActiveMenuItemEventHandler)}
                        </Menu.Menu>
                    </Menu> :
                    <Menu pointing secondary>
                        {createMenuItem('Restaurants', '/restaurants', this.props.updateActiveMenuItemEventHandler)}
                        {createMenuItem('My Reviews', '/userReviews/' + this.props.myId, this.props.updateActiveMenuItemEventHandler)}
                        {createMenuItem('Users', '/users', this.props.updateActiveMenuItemEventHandler)}

                         <Menu.Menu position='right'>
                              {createMenuItem('Profile', '/profile', this.props.updateActiveMenuItemEventHandler)}
                              {createMenuItem('Logout', '/login', this.props.logoutEventHandler)}
                         </Menu.Menu>

                        {this.props.activeMenuItem === "Restaurants" && <Redirect to="/restaurants" />}
                    </Menu>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isConnected: state['app'].get('isConnected'),
        myId: state['profile'].get('_id'),
        activeMenuItem: state['topBar'].get('activeMenuItem'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateActiveMenuItemEventHandler: (menuItem) => {
            dispatch(TopBarActions.updateActiveMenuItemAction(menuItem));
        },
        logoutEventHandler: () => {
            dispatch(TopBarActions.logoutAction());
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);