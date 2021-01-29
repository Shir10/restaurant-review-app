import React from 'react';
import { connect } from 'react-redux';
import { Table } from "semantic-ui-react";
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import RestaurantActions from "./actions";
import CreateModifyReview from "../CreateModifyReview/CreateModifyReview";


class Restaurant extends React.Component {
    componentDidMount() {
        this.props.loadRestaurantEventHandler(this.props.match.params.id);
    }

    render() {
        return (
            <div className="restaurant-root">
                <h3>&nbsp;&nbsp;{this.props.selectedRestaurantName}, {this.props.selectedRestaurantCity}</h3>
                <CreateModifyReview/>
                <Button
                    label="Add Review"
                    className="p-button-secondary"
                    onClick={this.props.openAddReviewEventHandler}
                />
                <div className="sortReviews">
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    Sort By:
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <RadioButton
                        value="date"
                        onChange={(e) => this.props.updateFieldValueEventHandler(e, 'sortReviewsBy')}
                        checked={this.props.sortReviewsBy === 'date'}
                    /> &nbsp;&nbsp; Date
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Dropdown
                        value={this.props.sortByDateValue}
                        options={this.props.sortByDateItems}
                        onChange={(e) => this.props.updateFieldValueEventHandler(e, 'sortByDateValue')}
                        disabled={this.props.sortReviewsBy !== 'date'}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <RadioButton
                        value="topic"
                        onChange={(e) => this.props.updateFieldValueEventHandler(e, 'sortReviewsBy')}
                        checked={this.props.sortReviewsBy === 'topic'}
                    /> &nbsp;&nbsp; Topic
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Dropdown
                        value={this.props.sortByTopicValue}
                        options={this.props.sortByTopicItems}
                        onChange={(e) => this.props.updateFieldValueEventHandler(e, 'sortByTopicValue')}
                        disabled={this.props.sortReviewsBy !== 'topic'}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                        label="Sort"
                        icon="pi pi-sort"
                        onClick={() => {
                            this.props.sortReviewsBy === "date" ?
                                this.props.sortReviewsByDateEventHandler(this.props.sortByDateValue, this.props.restaurantReviews) :
                                this.props.sortReviewsByTopicEventHandler(this.props.sortByTopicValue, this.props.restaurantReviews)
                        }}
                    />
                </div>
                {this.props.restaurantReviews.size > 0 ?
                    <Table celled padded striped={true} compact={true}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell singleLine>Number</Table.HeaderCell>
                                <Table.HeaderCell>Bathroom Quality</Table.HeaderCell>
                                <Table.HeaderCell>Staff Kindness</Table.HeaderCell>
                                <Table.HeaderCell>Cleanliness</Table.HeaderCell>
                                {this.props.selectedRestaurantIsDriveThru && <Table.HeaderCell>Drive-thru Quality</Table.HeaderCell>}
                                {this.props.selectedRestaurantIsDelivery && <Table.HeaderCell>Delivery Speed</Table.HeaderCell>}
                                <Table.HeaderCell>Food Quality</Table.HeaderCell>
                                <Table.HeaderCell>Score</Table.HeaderCell>
                                <Table.HeaderCell>Pictures</Table.HeaderCell>
                                {/*<Table.HeaderCell>Date</Table.HeaderCell>*/}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.props.restaurantReviews.map((review, index) =>
                                <Table.Row key={index}>
                                    <Table.Cell> {"# " + (index + 1)} </Table.Cell>
                                    <Table.Cell> {review.categories.bathroomQuality} </Table.Cell>
                                    <Table.Cell> {review.categories.staffKindness} </Table.Cell>
                                    <Table.Cell> {review.categories.cleanliness} </Table.Cell>
                                    {this.props.selectedRestaurantIsDriveThru && <Table.Cell> {review.categories.driveThruQuality} </Table.Cell>}
                                    {this.props.selectedRestaurantIsDelivery && <Table.Cell> {review.categories.deliverySpeed} </Table.Cell>}
                                    <Table.Cell> {review.categories.foodQuality} </Table.Cell>
                                    <Table.Cell> {review.average} </Table.Cell>
                                    <Table.Cell>
                                        {review.pic1 !== undefined && review.pic1.pictureType !== "" ?
                                            <img src={review.pic1.pictureData}  width="150" height="100"/> : null}
                                        &nbsp;&nbsp;&nbsp;
                                        {review.pic1 !== undefined && review.pic2.pictureType !== "" ?
                                            <img src={review.pic2.pictureData}  width="150" height="100"/> : null}
                                    </Table.Cell>
                                    {/*<Table.Cell> {review.date} </Table.Cell>*/}
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table> :
                    <p align='center'>No Reviews</p>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedRestaurantName: state['restaurant'].get('selectedRestaurantName'),
        selectedRestaurantCity: state['restaurant'].get('selectedRestaurantCity'),
        restaurantReviews: state['restaurant'].get('restaurantReviews'),
        sortReviewsBy: state['restaurant'].get('sortReviewsBy'),
        sortByDateValue: state['restaurant'].get('sortByDateValue'),
        sortByTopicValue: state['restaurant'].get('sortByTopicValue'),
        sortByDateItems: state['restaurant'].get('sortByDateItems'),
        sortByTopicItems: state['restaurant'].get('sortByTopicItems'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadRestaurantEventHandler: (_id) => {
            dispatch(RestaurantActions.loadRestaurantAction(_id));
        },
        openAddReviewEventHandler: () => {
            dispatch(RestaurantActions.openAddReviewAction());
        },
        updateFieldValueEventHandler: (e, field) => {
            dispatch(RestaurantActions.updateFieldValueAction(e.target.value, field));
        },
        sortReviewsByDateEventHandler: (sortByDateValue, restaurantReviews) => {
            dispatch(RestaurantActions.sortReviewsByDateAction(sortByDateValue, restaurantReviews));
        },
        sortReviewsByTopicEventHandler: (sortByTopicValue, restaurantReviews) => {
            dispatch(RestaurantActions.sortReviewsByTopicAction(sortByTopicValue, restaurantReviews));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);