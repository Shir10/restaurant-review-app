import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import UserReviewsActions from './actions';
import CreateModifyReview from '../CreateModifyReview/CreateModifyReview';


class UserReviews extends React.Component {
    componentDidMount() {
        this.props.loadUserReviewsEventHandler(this.props.match.params.id, this.props.restaurants);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.loadUserReviewsEventHandler(this.props.match.params.id, this.props.restaurants);
        }
    }

    render() {
        return (
            <div className="userReviews-root">
                {this.props.userReviews && this.props.userReviews.size > 0 ?
                    <Table celled padded striped={true} compact={true}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell singleLine>Number</Table.HeaderCell>
                                <Table.HeaderCell singleLine>Restaurant</Table.HeaderCell>
                                <Table.HeaderCell>Bathroom Quality</Table.HeaderCell>
                                <Table.HeaderCell>Staff Kindness</Table.HeaderCell>
                                <Table.HeaderCell>Cleanliness</Table.HeaderCell>
                                <Table.HeaderCell>Drive-thru Quality</Table.HeaderCell>
                                <Table.HeaderCell>Delivery Speed</Table.HeaderCell>
                                <Table.HeaderCell>Food Quality</Table.HeaderCell>
                                <Table.HeaderCell>Score</Table.HeaderCell>
                                <Table.HeaderCell>Pictures</Table.HeaderCell>
                                {this.props.activeMenuItem === 'My Reviews' && <Table.HeaderCell>Edit</Table.HeaderCell>}
                                {this.props.activeMenuItem === 'My Reviews' && <Table.HeaderCell>Delete</Table.HeaderCell>}
                                {/*<Table.HeaderCell>Date</Table.HeaderCell>*/}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.props.userReviews.map((review, index) =>
                                <Table.Row key={index}>
                                    <Table.Cell> {"# " + (index + 1)} </Table.Cell>
                                    <Table.Cell> {review.restaurantName}, {review.restaurantLocation} </Table.Cell>
                                    <Table.Cell> {review.categories.bathroomQuality} </Table.Cell>
                                    <Table.Cell> {review.categories.staffKindness} </Table.Cell>
                                    <Table.Cell> {review.categories.cleanliness} </Table.Cell>
                                    <Table.Cell> {review.categories.driveThruQuality === 0 ? "-" : review.categories.driveThruQuality} </Table.Cell>
                                    <Table.Cell> {review.categories.deliverySpeed === 0 ? "-" : review.categories.deliverySpeed} </Table.Cell>
                                    <Table.Cell> {review.categories.foodQuality} </Table.Cell>
                                    <Table.Cell> {review.average} </Table.Cell>
                                    <Table.Cell>
                                        {review.pic1 !== undefined && review.pic1.pictureType !== "" &&
                                            <img src={review.pic1.pictureData}  width="150" height="100"/>}
                                        &nbsp;&nbsp;&nbsp;
                                        {review.pic2 !== undefined && review.pic2.pictureType !== "" &&
                                            <img src={review.pic2.pictureData}  width="150" height="100"/>}
                                    </Table.Cell>
                                    {this.props.activeMenuItem === 'My Reviews' &&
                                        <Table.Cell>
                                            <CreateModifyReview/>
                                            <button
                                                type="button"
                                                onClick={() => this.props.openModifyReviewEventHandler(review)}
                                            >
                                                Edit Review
                                            </button>
                                        </Table.Cell>
                                    }
                                    {this.props.activeMenuItem === 'My Reviews' &&
                                        <Table.Cell>
                                            <button
                                                type="button"
                                                onClick={() => this.props.deleteReviewEventHandler(review, this.props.restaurants, this.props.userReviews)}
                                            >
                                                Delete Review
                                            </button>
                                        </Table.Cell>
                                    }
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
        userReviews: state['userReviews'].get('userReviews'),
        activeMenuItem: state['topBar'].get('activeMenuItem'),
        restaurants: state['restaurants'].get('restaurants'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserReviewsEventHandler: (userId, restaurants)=> {
            dispatch(UserReviewsActions.loadUserReviewsAction(userId, restaurants));
        },
        openModifyReviewEventHandler: (review) => {
            dispatch(UserReviewsActions.openModifyReviewAction(review));
        },
        deleteReviewEventHandler: (review, restaurants, userReviews) => {
            dispatch(UserReviewsActions.deleteReviewAction(review, restaurants, userReviews));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserReviews);
