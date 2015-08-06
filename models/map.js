var mongoose = require('mongoose');
var MapSchema = new mongoose.Schema({
accessToken: String,
mapId: String,
name : String,
folderName: String,
maxZoom : Number,
minZoom : Number,
southWestBound : [String],
northEastBound : [String],
center: [String]
});
module.exports = mongoose.model('Map', MapSchema);