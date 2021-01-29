import React from 'react';
import { connect } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import CreateModifyReviewActions from './actions';


class CreateModifyReview extends React.Component {
    constructor() {
        super();
        this.fileHandler = this.fileHandler.bind(this);
    }

    fileHandler(e) {
        const file = e.target.files[0];
        const picNum = e.target.name;
        let fs = new FileReader();
        fs.onloadend = () => {
            let pictureData = fs.result;
            let value = {
                pictureType: file.type,
                pictureData: pictureData,
            };
            this.props.updateCreateModifyReviewFieldEventHandler(e, {name:picNum ,value: value});
        };
        fs.readAsDataURL(file);
    }

    isValidReview(){
        return this.props.reviewBathroom > 0 && this.props.reviewStaff > 0 && this.props.reviewCleanliness > 0 &&
            ((this.props.selectedRestaurantIsDriveThru && this.props.reviewDriveThru > 0) || !this.props.selectedRestaurantIsDriveThru) &&
            ((this.props.selectedRestaurantIsDelivery && this.props.reviewDelivery > 0) || !this.props.selectedRestaurantIsDelivery) &&
            this.props.reviewFood > 0;
    }

    render() {
        const isValidReview = this.isValidReview();

        return (
            <div className="createModifyReview-root">
                <Dialog
                    header={this.props.activeMenuItem === 'Restaurants' ? "Add Review" : "Edit Review"}
                    footer={
                        <div>
                            <Button
                                label="Submit"
                                icon="pi pi-check"
                                onClick={() => this.props.activeMenuItem === 'My Reviews' ?
                                    this.props.submitEditReviewEventHandler(this.props.reviewId, this.props.reviewBathroom,
                                        this.props.reviewStaff, this.props.reviewCleanliness, this.props.reviewDriveThru,
                                        this.props.reviewDelivery, this.props.reviewFood, this.props.selectedRestaurantId,
                                        this.props.selectedRestaurantName, this.props.selectedRestaurantCity,
                                        this.props._id, this.props.restaurants, this.props.userReviews, this.props.pic1, this.props.pic2) :
                                    isValidReview ?
                                    this.props.submitAddReviewEventHandler(this.props.reviewBathroom,
                                        this.props.reviewStaff, this.props.reviewCleanliness, this.props.reviewDriveThru,
                                        this.props.reviewDelivery, this.props.reviewFood, this.props.selectedRestaurantId,
                                        this.props._id, this.props.pic1, this.props.pic2) :
                                    this.props.invalidCreateModifyReviewEventHandler()
                                }
                            />
                        </div>
                    }
                    visible={this.props.visibleCreateModifyReview}
                    style={{width: '50vw'}}
                    modal={true}
                    onHide={this.props.closeCreateModifyReviewEventHandler}
                >
                    <h2>Review Details</h2>
                    <form>
                        Bathroom Quality &nbsp;&nbsp;
                        <Dropdown
                            value={this.props.reviewBathroom}
                            options={this.props.reviewScoreItems}
                            onChange={(e) => this.props.CreateModifyReviewScoreEventHandler(e, 'reviewBathroom')}
                        />
                        <br/><br/> Staff Kindness &nbsp;&nbsp;&nbsp;&nbsp;
                        <Dropdown
                            value={this.props.reviewStaff}
                            options={this.props.reviewScoreItems}
                            onChange={(e) => this.props.CreateModifyReviewScoreEventHandler(e, 'reviewStaff')}
                        />
                        <br/><br/> Cleanliness &nbsp;&nbsp;&nbsp;&nbsp;
                        <Dropdown
                            value={this.props.reviewCleanliness}
                            options={this.props.reviewScoreItems}
                            onChange={(e) => this.props.CreateModifyReviewScoreEventHandler(e, 'reviewCleanliness')}
                        />
                        {this.props.selectedRestaurantIsDriveThru &&
                        <div>
                            <br/><br/> Drive-thru quality &nbsp;&nbsp;&nbsp;&nbsp;
                            <Dropdown
                                value={this.props.reviewDriveThru}
                                options={this.props.reviewScoreItems}
                                onChange={(e) => this.props.CreateModifyReviewScoreEventHandler(e, 'reviewDriveThru')}
                            />
                        </div>
                        }
                        {this.props.selectedRestaurantIsDelivery &&
                        <div>
                            <br/><br/> Delivery Speed &nbsp;&nbsp;&nbsp;&nbsp;
                            <Dropdown
                                value={this.props.reviewDelivery}
                                options={this.props.reviewScoreItems}
                                onChange={(e) => this.props.CreateModifyReviewScoreEventHandler(e, 'reviewDelivery')}
                            />
                        </div>
                        }
                        <br/><br/> Food Quality &nbsp;&nbsp;&nbsp;&nbsp;
                        <Dropdown
                            value={this.props.reviewFood}
                            options={this.props.reviewScoreItems}
                            onChange={(e) => this.props.CreateModifyReviewScoreEventHandler(e, 'reviewFood')}
                        />
                        <br/><br/>
                        <input type="file" name="pic1" accept="image/*" onChange={this.fileHandler}/>
                        <input type="file" name="pic2" accept="image/*" onChange={this.fileHandler}/>
                        {this.props.invalidCreateModifyReview && <label style={{color: 'red'}}> All Fields are Required!</label>}
                    </form>
                </Dialog>
                <br/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        _id: state['profile'].get('_id'),
        restaurants: state['restaurants'].get('restaurants'),
        selectedRestaurantId: state['restaurant'].get('selectedRestaurantId'),
        selectedRestaurantIsDelivery: state['restaurant'].get('selectedRestaurantIsDelivery'),
        selectedRestaurantIsDriveThru: state['restaurant'].get('selectedRestaurantIsDriveThru'),
        selectedRestaurantName: state['restaurant'].get('selectedRestaurantName'),
        selectedRestaurantCity: state['restaurant'].get('selectedRestaurantCity'),
        activeMenuItem: state['topBar'].get('activeMenuItem'),
        userReviews: state['userReviews'].get('userReviews'),
        visibleCreateModifyReview: state['createModifyReview'].get('visibleCreateModifyReview'),
        reviewId: state['createModifyReview'].get('reviewId'),
        reviewScoreItems: state['createModifyReview'].get('reviewScoreItems'),
        reviewBathroom: state['createModifyReview'].get('reviewBathroom'),
        reviewStaff: state['createModifyReview'].get('reviewStaff'),
        reviewCleanliness: state['createModifyReview'].get('reviewCleanliness'),
        reviewDriveThru: state['createModifyReview'].get('reviewDriveThru'),
        reviewDelivery: state['createModifyReview'].get('reviewDelivery'),
        reviewFood: state['createModifyReview'].get('reviewFood'),
        invalidCreateModifyReview: state['createModifyReview'].get('invalidCreateModifyReview'),
        pic1: state['createModifyReview'].get('pic1'),
        pic2: state['createModifyReview'].get('pic2'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeCreateModifyReviewEventHandler: () => {
            dispatch(CreateModifyReviewActions.closeCreateModifyReviewAction());
        },
        CreateModifyReviewScoreEventHandler: (e, category) => {
            dispatch(CreateModifyReviewActions.CreateModifyReviewScoreAction(e.target.value, category));
        },
        submitAddReviewEventHandler: (bathroomQuality, staffKindness, cleanliness, driveThruQuality, deliverySpeed, foodQuality, restaurantId, myId, pic1, pic2) => {
            dispatch(CreateModifyReviewActions.submitAddReviewAction(bathroomQuality, staffKindness, cleanliness, driveThruQuality, deliverySpeed, foodQuality, restaurantId, myId, pic1, pic2));
        },
        invalidCreateModifyReviewEventHandler: () => {
            dispatch(CreateModifyReviewActions.invalidCreateModifyReviewAction());
        },
        submitEditReviewEventHandler: (reviewId, bathroomQuality, staffKindness, cleanliness, driveThruQuality, deliverySpeed, foodQuality, restaurantId, restaurantName, restaurantCity, myId, restaurants, userReviews, pic1, pic2) => {
            dispatch(CreateModifyReviewActions.submitEditReviewAction(reviewId, bathroomQuality, staffKindness, cleanliness, driveThruQuality, deliverySpeed, foodQuality, restaurantId, restaurantName, restaurantCity, myId, restaurants, userReviews, pic1, pic2));
        },
        updateCreateModifyReviewFieldEventHandler: (e, data) => {
            if (data){
                dispatch(CreateModifyReviewActions.updateCreateModifyReviewFieldEventHandler(data.name, data.value));
            }
            else{
                dispatch(CreateModifyReviewActions.updateCreateModifyReviewFieldEventHandler(e.target.name, e.target.value));
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateModifyReview);