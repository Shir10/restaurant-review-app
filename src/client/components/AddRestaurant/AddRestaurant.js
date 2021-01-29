import React from 'react';
import { connect } from 'react-redux';
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { AutoComplete } from 'primereact/autocomplete';
import AddRestaurantActions from './actions';
import AppActions from '../App/actions';


class AddRestaurant extends React.Component {
    render() {
        return (
            <div className="addRestaurant-root">
                <Dialog
                    header="Add Restaurant"
                    footer={
                        <div>
                            <Button
                                label="Submit"
                                icon="pi pi-check"
                                onClick={(this.props.addRestaurantName !== "" &&
                                    this.props.locations.map(location => location.city).includes(this.props.addRestaurantLocation)) ?
                                    () => this.props.submitAddRestaurantEventHandler(
                                        this.props.addRestaurantName,
                                        ...this.props.locations.filter(location => location.city === this.props.addRestaurantLocation),
                                        this.props.addRestaurantIsDelivery,
                                        this.props.addRestaurantIsDriveThru) :
                                    () => this.props.invalidInputAddRestaurantEventHandler(
                                        this.props.addRestaurantName,
                                        this.props.addRestaurantLocation,
                                        this.props.locations)
                                }
                            />
                        </div>
                    }
                    visible={this.props.visibleAddRestaurant}
                    style={{width: '50vw'}}
                    modal={true}
                    onHide={this.props.closeAddRestaurantEventHandler}
                >
                    <h2>Restaurant Details</h2>
                    <form>
                        <input
                            name="name"
                            onChange={this.props.updateAddRestaurantNameEventHandler}
                            placeholder="Name"
                            value={this.props.addRestaurantName}
                            autoComplete="off"
                        />
                        {this.props.invalidRestaurantName && <label style={{color: 'red'}}> Invalid Name!</label>}
                        <br/><br/>
                        <AutoComplete
                            dropdown={true}
                            placeholder="Location"
                            value={this.props.addRestaurantLocation}
                            onChange={this.props.updateAddRestaurantLocationEventHandler}
                            suggestions={this.props.suggestedCities}
                            completeMethod={(e) => this.props.getSuggestedCitiesEventHandler(e, this.props.locations.map(location => location.city))}
                        />
                        {this.props.invalidRestaurantLocation && <label style={{color: 'red'}}> Invalid Location!</label>}
                        <br/><br/>
                        <input
                            type="checkbox"
                            name="Delivery"
                            checked={this.props.addRestaurantIsDelivery}
                            onChange={this.props.updateAddRestaurantIsDeliveryEventHandler}/>
                        <label htmlFor="Delivery">Delivery</label>
                        <br/><br/>
                        <input
                            type="checkbox"
                            name="DriveThru"
                            checked={this.props.addRestaurantIsDriveThru}
                            onChange={this.props.updateAddRestaurantIsDriveThruEventHandler}/>
                        <label htmlFor="DriveThru">Drive Thru</label>
                        <br/><br/>
                    </form>
                </Dialog>
                <br/>
                <Button label="Add Restaurant" className="p-button-secondary" onClick={this.props.openAddRestaurantEventHandler} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        locations: state['app'].get('locations'),
        suggestedCities: state['app'].get('suggestedCities'),
        visibleAddRestaurant: state['addRestaurant'].get('visibleAddRestaurant'),
        addRestaurantName: state['addRestaurant'].get('addRestaurantName'),
        addRestaurantLocation: state['addRestaurant'].get('addRestaurantLocation'),
        addRestaurantIsDelivery: state['addRestaurant'].get('addRestaurantIsDelivery'),
        addRestaurantIsDriveThru: state['addRestaurant'].get('addRestaurantIsDriveThru'),
        invalidRestaurantName: state['addRestaurant'].get('invalidRestaurantName'),
        invalidRestaurantLocation: state['addRestaurant'].get('invalidRestaurantLocation'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        openAddRestaurantEventHandler: () => {
            dispatch(AddRestaurantActions.openAddRestaurantAction());
        },
        submitAddRestaurantEventHandler: (name, location, isDelivery, isDriveThru) => {
            dispatch(AddRestaurantActions.submitAddRestaurantAction(name, location, isDelivery, isDriveThru));
        },
        closeAddRestaurantEventHandler: () => {
            dispatch(AddRestaurantActions.closeAddRestaurantAction());
        },
        updateAddRestaurantNameEventHandler: (e) => {
            dispatch(AddRestaurantActions.updateAddRestaurantNameAction(e.target.value));
        },
        updateAddRestaurantLocationEventHandler: (e) => {
            dispatch(AddRestaurantActions.updateAddRestaurantLocationAction(e.target.value));
        },
        updateAddRestaurantIsDeliveryEventHandler: (e) => {
            dispatch(AddRestaurantActions.updateAddRestaurantIsDeliveryAction(e.target.checked));
        },
        updateAddRestaurantIsDriveThruEventHandler: (e) => {
            dispatch(AddRestaurantActions.updateAddRestaurantIsDriveThruAction(e.target.checked));
        },
        getSuggestedCitiesEventHandler: (e, cities) => {
            dispatch(AppActions.getSuggestedCitiesAction(e.query, cities));
        },
        invalidInputAddRestaurantEventHandler: (restaurantName, restaurantLocation, locations) => {
            dispatch(AddRestaurantActions.invalidInputAddRestaurantAction(restaurantName, restaurantLocation, locations));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRestaurant);