Design: There are 13 types of components in our implementation:

Main component:
1. App: The main component, holds fields related to the application mode such as isConnected and isLoaded.
2. TopBar: The app menu, has the following tabs: 
    Login and Register - when the user is not connected.
    Restaurants, My Reviews, Users, Profile, Logout - when the user is connected.

User components:
1. Login: Checks for correct combination of username and password that exists in the DB. 
2. Register: Includes fields the user must fill in order to sign up the system. The username must be unique - one that is not occupied by another user.
3. Profile: Allows the user change his username and location.
4. UserForm: A template for the login, register and profile screens.
5. Users: Displays the information about all the users in the system, allows searching by name, username or location.

Restaurant components:
1. Restaurants: Displays all the restaurants in the system and their details.
2. AddRestaurant: Allows to add a restaurant to the restaurants list. Each restaurant has a unique combination of name and location.
3. SearchRestaurants: Allows to search restaurants by name, location, score or closer-better scale.

Review components: 
1. UserReview: Displays all reviews of a specific user.
2. CreateModifyReview: Allows the user to add a restaurant review or modify an existing review.
    Adding a review occurs on the specific restaurant's reviews page.
    Modifying a review occurs on the "My Reviews" page.
3. Reviews: Displays reviews of a specific restaurant, allows sorting reviews by date or score.


To start the server:
1. start mongodb using mongod
2. node src\server\server.js # backend
3. npm run dev # frontend


Mongoose Models:

UserModel = id: String,
            firstName: String,
            lastName: String,
            username: String,
            password: String,
            location: {city: String, x: Number, y: Number},
            picture: {
                pictureType: String,
                pictureData: String
            }
    
ReviewModel =  categories: {
                   bathroomQuality: Number,
                   staffKindness: Number,
                   cleanliness: Number,
                   driveThruQuality: Number,
                   deliverySpeed: Number,
                   foodQuality: Number,
               },
               pic1: {
                   pictureType: String,
                   pictureData: [],
               },
               pic2: {
                   pictureType: String,
                   pictureData: [],
               },
               restaurantId: String,
               userId: String,
               date: Date,
               image: {imageType: String, imageData: String},
               average: Number

RestaurantModel = name: String,
                  location: {city: String, x: Number, y: Number},
                  reviewsAverage: Number,
                  isDelivery: Boolean,
                  isDriveThru: Boolean
                  
LocationsModel = cities: [{
                    city: String,
                    x: Number,
                    y: Number
                }]

Extra libraries:
1. Semantic-ui React.
2. PrimeReact. 