import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import SearchRestaurantsActions from './actions';
import AppActions from '../App/actions';


class SearchRestaurants extends React.Component {
    render() {
        return (
            <div className="searchRestaurants-root">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label>Search</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <AutoComplete
                    dropdown={true}
                    placeholder="Name"
                    value={this.props.searchRestaurantName}
                    onChange={this.props.searchRestaurantNameEventHandler}
                    suggestions={this.props.suggestedRestaurantsNames}
                    completeMethod={(e) => this.props.getSuggestedRestaurantsNamesEventHandler(e, this.props.restaurants.map(rest => rest.name))}
                    autoComplete="off"
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <AutoComplete
                    dropdown={true}
                    placeholder="Location"
                    value={this.props.searchRestaurantLocation}
                    onChange={this.props.searchRestaurantLocationEventHandler}
                    suggestions={this.props.suggestedCities}
                    completeMethod={(e) => this.props.getSuggestedCitiesEventHandler(e, this.props.locations.map(location => location.city))}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Dropdown
                    value={this.props.searchRestaurantScore}
                    options={this.props.searchRestaurantScoreItems}
                    onChange={this.props.searchRestaurantScoreEventHandler}
                    placeholder="Score Above"
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <RadioButton
                    value="closer"
                    onChange={this.props.searchRestaurantCloserBetterEventHandler}
                    checked={this.props.searchRestaurantCloserBetter === "closer"}
                /> &nbsp;&nbsp; Closer
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <RadioButton
                    value="better"
                    onChange={this.props.searchRestaurantCloserBetterEventHandler}
                    checked={this.props.searchRestaurantCloserBetter === "better"}
                /> &nbsp;&nbsp; Better
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                    label="Search"
                    icon="pi pi-search"
                    onClick={() => this.props.searchRestaurantsEventHandler(this.props.searchRestaurantName,
                        this.props.searchRestaurantLocation, this.props.searchRestaurantScore, this.props.searchRestaurantCloserBetter,
                        this.props.myLocation, this.props.locations)
                    }
                />
                <br/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        locations: state['app'].get('locations'),
        suggestedCities: state['app'].get('suggestedCities'),
        restaurants: state['restaurants'].get('restaurants'),
        myLocation: state['profile'].get('location'),
        searchRestaurants: state['searchRestaurants'].get('searchRestaurants'),
        suggestedRestaurantsNames: state['searchRestaurants'].get('suggestedRestaurantsNames'),
        searchRestaurantName: state['searchRestaurants'].get('searchRestaurantName'),
        searchRestaurantLocation: state['searchRestaurants'].get('searchRestaurantLocation'),
        searchRestaurantScore: state['searchRestaurants'].get('searchRestaurantScore'),
        searchRestaurantCloserBetter: state['searchRestaurants'].get('searchRestaurantCloserBetter'),
        searchRestaurantScoreItems: state['searchRestaurants'].get('searchRestaurantScoreItems'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSuggestedCitiesEventHandler: (e, cities) => {
            dispatch(AppActions.getSuggestedCitiesAction(e.query, cities));
        },
        searchRestaurantNameEventHandler: (e) => {
            dispatch(SearchRestaurantsActions.searchRestaurantNameAction(e.target.value));
        },
        searchRestaurantLocationEventHandler: (e) => {
            dispatch(SearchRestaurantsActions.searchRestaurantLocationAction(e.target.value));
        },
        searchRestaurantScoreEventHandler: (e) => {
            dispatch(SearchRestaurantsActions.searchRestaurantScoreAction(e.target.value));
        },
        searchRestaurantCloserBetterEventHandler: (e) => {
            dispatch(SearchRestaurantsActions.searchRestaurantCloserBetterAction(e.target.value));
        },
        searchRestaurantsEventHandler: (name, location, score, closerBetter, myLocation, locations) => {
            dispatch(SearchRestaurantsActions.searchRestaurantsAction(name, location, score, closerBetter, myLocation, locations));
        },
        getSuggestedRestaurantsNamesEventHandler: (e, restaurantsNames) => {
            dispatch(SearchRestaurantsActions.getSuggestedRestaurantsNamesAction(e.query, restaurantsNames));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchRestaurants);