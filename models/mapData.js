var mongoose = require('mongoose');
var MapDataSchema = new mongoose.Schema({id: String},{ strict: false });
module.exports = mongoose.model('MapData', MapDataSchema);