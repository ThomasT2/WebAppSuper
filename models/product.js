/**
 * The blueprint for the items in the database.
 * The schema defines the attributes of the product,
 * a review in this case.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    imagePath: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    rating: {type: Number, required: true}
});

module.exports = mongoose.model('Product', schema);