var mongoose = require('mongoose');
var MapDataSchema = new mongoose.Schema({id: String,__v: {type: Number, select: false}}, { strict: false });
module.exports = mongoose.model('MapData', MapDataSchema);