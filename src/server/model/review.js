let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let reviewSchema = new Schema({
    categories: {
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
});

module.exports = mongoose.model('ReviewModel', reviewSchema, 'reviews');