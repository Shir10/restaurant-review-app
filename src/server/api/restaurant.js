let RestaurantModel = require('../model/restaurant');
let ReviewModel = require('../model/review');


module.exports = (app) => {
    app.get('/api/restaurant', get_all_restaurants);
    app.get('/api/restaurant/:_id', get_restaurant_by_id);
    app.post('/api/restaurant/add_restaurant', add_restaurant);
    app.post('/api/restaurant/search_restaurants', search_restaurants);
};

function get_all_restaurants(req, res) {
    console.log('get all restaurant');
    RestaurantModel.find().then(restaurants => {
        res.json(restaurants)
    });
}

function get_restaurant_by_id(req, res) {
    console.log('get restaurant by id', req.params._id);
    RestaurantModel.findOne({ _id: req.params._id })
        .then(restaurant => {
            ReviewModel
                .find({ restaurantId: req.params._id })
                .then(restaurantReviews => {
                    res.json({
                        restaurant,
                        restaurantReviews,
                    });
                });
        });
}

// if the input restaurant in the specific location does not exist - add it
function add_restaurant(req, res) {
    console.log('add restaurant');
    const inputRestaurant = req.body;
    RestaurantModel
        .findOne({name: inputRestaurant.name, location: inputRestaurant.location})
        .then(restaurant => {
            if(restaurant !== null){
                res.json({
                    success: false
                })
            }
            else{
                const newRestaurant = new RestaurantModel(inputRestaurant);
                newRestaurant
                    .save()
                    .then(success => {
                        if (success === newRestaurant) {
                            res.json({
                                success: true,
                                restaurant: {
                                    ...newRestaurant._doc
                                }
                            })
                        } else {
                            res.json({
                                success: false
                            })
                        }
                    }, err => {
                        console.log(err);
                    });
            }
        });
}

function search_restaurants(req, res) {
    console.log('search restaurants');
    const query = req.body.query;
    RestaurantModel
        .find(query)
        .then(restaurants => {
            res.json(restaurants)
        });
}