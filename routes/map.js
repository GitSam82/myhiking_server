var express = require('express');
var router = express.Router();

var mongoose = require( 'mongoose' );
var map = require('../models/map'); 
var mapData = require('../models/mapData'); 
var mapCheckpoint = require('../models/mapCheckpoint'); 

/* GET all maps*/
router.get('/all', function(req, res, next) {
    map.find({},{ '_id': 0 }, function(err, docs){
        res.send(docs);
    });
  
});

/* GET map init data */
router.get('/:mapid/base', function(req, res, next) {
    map.find({"mapId":req.params.mapid},{ '_id': 0 }, function(err, docs){
        res.send(docs);
    });
  
});

/* GET map GeoJSON decorations data */
router.get('/:mapid/decorations', function(req, res, next) {
    mapData.find({"id":req.params.mapid},{ '_id': 0 }, function(err, docs){
        res.send(docs);
    });
  
});

/* GET checkpoint data */
router.get('/:mapid/:routeId/:checkpointId/data', function(req, res, next) {
    mapCheckpoint.find({"mapId":req.params.mapid, "routeId":req.params.routeId, "checkpointId":req.params.checkpointId},{ '_id': 0 }, function(err, docs){
        res.send(docs);
    });
  
});

/* GET checkpoint data */
router.get('/:mapid/checkpoints/data', function(req, res, next) {
    mapCheckpoint.find({"mapId":req.params.mapid},{ '_id': 0 }, function(err, docs){
        res.send(docs);
    });
  
});

/*POST create a new map*/
router.post('/create', function(req, res, next) {
    var query = {"mapId":req.body.mapId};
    var update = req.body;
    var options = {upsert: true, new: true};
    
    map.findOneAndUpdate(
        query, update, options,
        function (err) {
        if (err) {
            console.log(err);
            res.send( { "code":"KO", "message": err.message });
        }else{
            console.log("Map created succesfully");
            res.send( { "code":"OK"});
        }
    });
     
});

/*POST create a new map*/
router.post('/createData', function(req, res, next) {
    
    var query = {"id":req.body.id};
    var update = req.body;
    var options = {upsert: true, new: true};
    
    mapData.findOneAndUpdate(query, update, options,function (err) {
        if (err) {
            console.log(err);
            res.send( { "code":"KO", "message": err.message });
        }else{
            console.log("MapData created succesfully");
            res.send( { "code":"OK"});
        }
    });
     
});

/*POST create a new map*/
router.post('/createCheckpoint', function(req, res, next) {
    
    var query = {"mapId":req.body.mapId, "routeId" : req.body.routeId, "checkpointId": req.body.checkpointId };
    var update = req.body;
    var options = {upsert: true, new: true};

    mapCheckpoint.findOneAndUpdate(query, update, options,function (err) {
        if (err) {
            console.log(err);
            res.send( { "code":"KO", "message": err.message });
        }else{
            console.log("Checkpoint created succesfully");
            res.send( { "code":"OK"});
        }
    });
     
});

module.exports = router;
