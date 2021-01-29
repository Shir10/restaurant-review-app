const { List, Map } = require('immutable');

export default {
    app: Map({
        locations: List(),
        suggestedCities: [],
        isConnected: false,
        isLoaded: false,
    }),
    topBar: Map({
        activeMenuItem: 'Login',
    }),
    register: Map({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        location: '',
        picture: {
            pictureType: '',
            pictureData: [],
        },
        invalidRegisterUsername: false, // When username already exist
        invalidRegisterLocation: false, // Location is not one of the locations
        invalidRegisterInput: false, // At least one of the fields is empty
    }),
    login: Map({
        username: '',
        password: '',
        invalidLoginInput: false, // At least one of the fields is empty
        wrongLoginInput: false, // The combination of the username and password does not match any document in the DB
    }),
    profile: Map({
        _id: '',
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        location: '',
        picture: {
            pictureType: '',
            pictureData: [],
        },
        invalidProfileUsername: false, // When username already exist
        invalidProfileLocation: false, // Location is not one of the locations
        invalidProfileInput: false, // At least one of the fields is empty
        hasUpdated: false
    }),
    restaurants: Map({
        restaurants: List(),
    }),
    addRestaurant: Map({
        visibleAddRestaurant: false,
        addRestaurantName: '',
        addRestaurantLocation: '',
        addRestaurantIsDriveThru: false,
        addRestaurantIsDelivery: false,
        invalidRestaurantName: false,
        invalidRestaurantLocation: false,
    }),
    searchRestaurants: Map({
        searchRestaurants: List(),
        suggestedRestaurantsNames: [],
        searchRestaurantName: '',
        searchRestaurantLocation: '',
        searchRestaurantScore: 0,
        searchRestaurantCloserBetter: 'better',
        searchRestaurantScoreItems: [
            {label: '1', value: 1},
            {label: '2', value: 2},
            {label: '3', value: 3},
            {label: '4', value: 4},
        ],
    }),
    restaurant: Map({
        selectedRestaurantId: '',
        selectedRestaurantName: '',
        selectedRestaurantCity: '',
        selectedRestaurantIsDelivery: false,
        selectedRestaurantIsDriveThru: false,
        restaurantReviews: List(),
        sortReviewsBy: 'date',
        sortByDateValue: '',
        sortByTopicValue: '',
        sortByDateItems: [
            {label: 'From Newest', value: 'From Newest'},
            {label: 'From Oldest', value: 'From Oldest'},
            /*{label: 'Since Last Week', value: 'Since Last Week'},
            {label: 'Since Last Month', value: 'Since Last Month'},
            {label: 'Since Last Year', value: 'Since Last Year'},*/
        ],
        sortByTopicItems: [
            {label: 'Bathroom Quality', value: 'Bathroom Quality'},
            {label: 'Staff Kindness', value: 'Staff Kindness'},
            {label: 'Cleanliness', value: 'Cleanliness'},
            {label: 'Drive-thru quality', value: 'Drive-thru quality'},
            {label: 'Delivery Speed', value: 'Delivery Speed'},
            {label: 'Food Quality', value: 'Food Quality'},
        ]
    }),
    createModifyReview: Map({
        visibleCreateModifyReview: false,
        reviewScoreItems: [
            {label: '1', value: 1},
            {label: '2', value: 2},
            {label: '3', value: 3},
            {label: '4', value: 4},
            {label: '5', value: 5},
        ],
        reviewId: '',
        reviewBathroom: 0,
        reviewStaff: 0,
        reviewCleanliness: 0,
        reviewDriveThru: 0,
        reviewDelivery: 0,
        reviewFood: 0,
        invalidCreateModifyReview: false,
        pic1: {
            pictureType: '',
            PictureData: [],
        },
        pic2: {
            pictureType: '',
            PictureData: [],
        },
    }),
    userReviews: Map({
        userReviews: List(),
    }),
    users: Map({
        users: List(),
        searchUsers: List(),
        searchUserFirstName: '',
        searchUserUsername: '',
        searchUserLocation: '',
        suggestedUsersFirstName: [],
        suggestedUsersUsername: [],
    })
};
