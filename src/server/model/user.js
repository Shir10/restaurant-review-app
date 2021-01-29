let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    location: {city: String, x: Number, y: Number},
    picture: {
        pictureType: String,
        pictureData: String
    }
});

module.exports = mongoose.model('UserModel', userSchema, 'users');