let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let locationsSchema = new Schema({
    cities: [{
        city: String,
        x: Number,
        y: Number
    }]
});

module.exports = mongoose.model('LocationsModel', locationsSchema, 'locations');