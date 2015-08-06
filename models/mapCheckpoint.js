var mongoose = require('mongoose');
var MapCheckpointSchema = new mongoose.Schema({
mapId: String,
routeId : String,
checkpointId: String,
directions : String,
directionsImg : String,
title : String,
description: String    
});
module.exports = mongoose.model('MapCheckpoint', MapCheckpointSchema);