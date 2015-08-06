var mongoose = require('mongoose');
var MapCheckpointSchema = new mongoose.Schema({
mapId: String,
routeId : String,
checkpointId: String,
directions : String,
directionsImg : String,
title : String,
description: String,
accessNumber: { type: Number, default: 0 }    
});
module.exports = mongoose.model('MapCheckpoint', MapCheckpointSchema);