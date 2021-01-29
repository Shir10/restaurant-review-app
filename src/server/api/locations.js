let LocationsModel = require('../model/locations');
let locations = require('../initLocationsDB');
const { List } = require('immutable');

module.exports = (app) => {
    app.get('/api/load/locations', get_all_locations);
};

let _handleError = function(err){
    if (err) return console.log(err);
};

function get_all_locations(req, res) {
    console.log('get all locations');
    LocationsModel
        .findOne()
        .then(doc => {
            if (doc === null) { //init cities model
                let newDoc = new LocationsModel({cities: locations.cities});
                newDoc
                    .save(_handleError)
                    .then(() => {
                        res.json(List(newDoc));
                    })
            } else {
                res.json(doc.cities);
            }
        })
        .catch(_handleError);
}
