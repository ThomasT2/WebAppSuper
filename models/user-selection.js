/**
 * The blueprint for the selection, where a
 * portfolio of one or more reviews are stored
 * in the User Profile. The schema defines the
 * two attributes.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    portfolio: {type: Object, required: true}
});

module.exports = mongoose.model('Selection', schema);