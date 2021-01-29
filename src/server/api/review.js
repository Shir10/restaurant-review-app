let ReviewModel = require('../model/review');
let RestaurantModel = require('../model/restaurant');

module.exports = (app) => {
    app.get('/api/review/user_reviews/:_id', get_reviews_by_userId);
    app.post('/api/review/add_review', add_review);
    app.post('/api/review/update_review', update_review);
    app.post('/api/review/delete_review', delete_review);
};

function get_reviews_by_userId(req, res) {
    console.log('get reviews by user id', req.params._id);
    ReviewModel
        .find({ userId: req.params._id })
        .then(reviews => {
            res.json(reviews)
        });
}

function add_review(req, res) {
    console.log('add review');
    const inputReview = req.body.review;
    let newReview = new ReviewModel(inputReview);
    newReview.average = calc_average(Object.values(inputReview.categories).filter(x => x !== 0));
    console.log('update review average to ' + newReview.average);
    newReview
        .save()
        .then(success => {
            if (success === newReview) {
                update_restaurant_avg(res, newReview);
            } else {
                res.json({
                    success: false
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
}

function update_review(req, res){
    console.log('update review');
    const inputReview = req.body.review;
    const reviewAverage = calc_average(Object.values(inputReview.categories).filter(x => x !== 0));
    console.log('update review average to ' + reviewAverage);
    inputReview.pic1 !== undefined && inputReview.pic1.pictureType !== "" ?
    ReviewModel
        .updateOne({
            _id: inputReview._id
        }, {
            categories: inputReview.categories,
            pic1: inputReview.pic1,
            pic2: inputReview.pic2,
            date:inputReview.date,
            average: reviewAverage
        })
        .then(() => {
            update_restaurant_avg(res, {...inputReview, average: reviewAverage});
        })
    : ReviewModel
        .updateOne({_id: inputReview._id}, {categories: inputReview.categories, date:inputReview.date, average: reviewAverage})
        .then(() => {
            update_restaurant_avg(res, {...inputReview, average: reviewAverage});
        })
}

function delete_review(req, res){
    console.log('delete review');
    const inputReview = req.body;
    ReviewModel
        .deleteOne({_id: inputReview._id})
        .then(() => {
            update_restaurant_avg(res, inputReview);
        });
}

function update_restaurant_avg(res, review){
    ReviewModel
        .find({restaurantId: review.restaurantId})
        .then(restaurantReviews => {
            const avg = calc_average(restaurantReviews.map(x => x.average));
            console.log('update restaurant average to ' + avg);
            RestaurantModel
                .updateOne({_id: review.restaurantId}, {reviewsAverage: avg})
                .then(() => {
                    res.json({
                        review: review,
                        restaurantAvg: avg
                    })
                });
        });
}

function calc_average(nums){
    if (nums && nums.length > 0){
        let sum = nums.reduce((acc, curr) => acc + curr);
        let len = nums.length;
        return sum / len;
    }
    return 0;
}

