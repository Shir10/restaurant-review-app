import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import RestaurantsActions from './actions';
import AddRestaurant from '../AddRestaurant/AddRestaurant';
import SearchRestaurants from '../SearchRestaurants/SearchRestaurants';


class Restaurants extends React.Component {
    componentDidMount() {
        this.props.loadAllRestaurantsEventHandler();
        this.props.resetRestaurantFieldsEventHandler(this.props.restaurants);
    }

    render() {
        return (
            <div className="restaurants-root">
                <div>
                    <AddRestaurant/>
                    <SearchRestaurants/>
                    {this.props.searchRestaurants.size > 0 ?
                        <Table celled padded striped={true} compact={true}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell singleLine>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Location</Table.HeaderCell>
                                    <Table.HeaderCell>Delivery</Table.HeaderCell>
                                    <Table.HeaderCell>Drive-thru</Table.HeaderCell>
                                    <Table.HeaderCell>Score</Table.HeaderCell>
                                    <Table.HeaderCell>Reviews</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.props.searchRestaurants.map((restaurant, index) =>
                                    <Table.Row key={index}>
                                        <Table.Cell> {restaurant.name} </Table.Cell>
                                        <Table.Cell> {restaurant.location.city} </Table.Cell>
                                        <Table.Cell> {restaurant.isDelivery ? "YES" : "NO"} </Table.Cell>
                                        <Table.Cell> {restaurant.isDriveThru ? "YES" : "NO"} </Table.Cell>
                                        <Table.Cell> {restaurant.reviewsAverage} </Table.Cell>
                                        <Table.Cell>
                                            <Link to={"/restaurant/"+restaurant._id}>
                                                <button type="button">
                                                    Show Reviews
                                                </button>
                                            </Link>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table> :
                        <p align='center'>No restaurants to show</p>
                    }
                    <br/><br/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        _id: state['profile'].get('_id'),
        searchRestaurants: state['searchRestaurants'].get('searchRestaurants'),
        restaurants: state['restaurants'].get('restaurants'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadAllRestaurantsEventHandler: () => {
            dispatch(RestaurantsActions.loadAllRestaurantsAction());
        },
        resetRestaurantFieldsEventHandler: (restaurants) => {
            dispatch(RestaurantsActions.resetRestaurantFieldsAction(restaurants));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);