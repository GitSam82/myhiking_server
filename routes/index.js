var express = require('express');
var router = express.Router();

var mongoose = require( 'mongoose' );
var map = require('../models/map'); 
var mapData = require('../models/mapData'); 
var mapCheckpoint = require('../models/mapCheckpoint'); 


/* GET home page. */
router.get('/', function(req, res, next) {

    console.log("Saving record");

   /* var newMap = new map({
        accessToken: "pk.eyJ1Ijoic2FtdWVsZWZlcnJhcmkiLCJhIjoiZTU5MThmMTk3ZWJhYzRmYzEyNjIxM2Y4NWVkYzlhN2UifQ.cxz9rBmt8chTnMM32090ig#17/45.83379/9.32137",
        mapId: "samueleferrari.mpao2mk0",
        name : "Ladurns",
        folderName: "myhiking_Ladurns",
        maxZoom : 18,
        minZoom : 15,
        center: ["46.492","11.38"],
        southWestBound : ["46.9319", "11.3548"],
        northEastBound : ["46.9520","11.4036"]
    });
newMap.save(function (err) {});    */
    
    
   /* var thingSchema = new mongoose.Schema({}, { strict: false });
    var thing = mongoose.model('Thing', thingSchema);
    var newThing = new thing({ iAmNotInTheSchema: true });
    newThing.save() ;*/
    
 /*   var newMapData = new mapData(
    {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"id":"marker-ick3grlp0","title":"Checkpoint","description":"Descrizione","marker-size":"small","marker-color":"#ffffff","marker-symbol":""},"geometry":{"coordinates":[11.367781,46.933553],"type":"Point"},"id":"0b666fe65e7f1c85cbf15753bd99cc7e"},{"type":"Feature","properties":{"id":"marker-icdw1cqk3","title":"Edelweissehutte","description":"Rifugio Edelweissehutte","marker-size":"medium","marker-color":"#1087bf","marker-symbol":"restaurant"},"geometry":{"coordinates":[11.367319,46.933942],"type":"Point"},"id":"21da88c2765318b41c042ddd94d8cf94"},{"type":"Feature","properties":{"title":"Seggiovia Landurns","description":"","id":"marker-icdvmzvg0","stroke":"#6c6c6c","stroke-width":4,"stroke-opacity":1},"geometry":{"coordinates":[[11.388015,46.951082],[11.374497,46.940593]],"type":"LineString"},"id":"617f03128dea8eaaeab807ada7c7357a"},{"type":"Feature","properties":{"title":"","description":"","id":"marker-icdw9mme5","stroke":"#f86767","stroke-width":7,"stroke-opacity":1},"geometry":{"coordinates":[[11.374006,46.940183],[11.374108,46.93997],[11.374132,46.939909],[11.374172,46.939859],[11.374247,46.939757],[11.374471,46.939782],[11.374711,46.939803],[11.374828,46.939747],[11.374724,46.939604],[11.374711,46.939431],[11.37493,46.939191],[11.375277,46.939007],[11.375271,46.938795],[11.375067,46.938728],[11.374862,46.938659],[11.37451,46.938169],[11.374261,46.938008],[11.373991,46.937983],[11.373918,46.93785],[11.373928,46.937647],[11.373513,46.937394],[11.373146,46.937295],[11.372664,46.936832],[11.372001,46.936459]],"type":"LineString"},"id":"67e0d6e571a0b011f0b6d552d3fd07a4"},{"type":"Feature","properties":{"id":"marker-icdvzh1e2","title":"Ladurnerhutte","description":"Rifugio Ladurnerhutte","marker-size":"medium","marker-color":"#1087bf","marker-symbol":"restaurant"},"geometry":{"coordinates":[11.3738,46.940293],"type":"Point"},"id":"d174849ba2f2716e1c36004447880317"},{"type":"Feature","properties":{"title":"","description":"","id":"marker-icdwam146","stroke":"#f86767","stroke-width":7,"stroke-opacity":1},"geometry":{"coordinates":[[11.371997,46.936456],[11.371901,46.936346],[11.37182,46.936237],[11.371654,46.935986],[11.371093,46.93552],[11.370871,46.935482],[11.370774,46.935466],[11.370609,46.935371],[11.370585,46.935305],[11.370554,46.93523],[11.370373,46.935077],[11.370287,46.934896],[11.37022,46.934756],[11.37011,46.934656],[11.370077,46.934572],[11.370044,46.934489],[11.369992,46.934363],[11.369921,46.934293],[11.369792,46.934167],[11.369715,46.934089],[11.369638,46.934065],[11.36937,46.93399],[11.369154,46.933949],[11.369004,46.933923],[11.368841,46.933817],[11.368561,46.933728],[11.368308,46.933746],[11.368164,46.933803],[11.368019,46.933851],[11.367971,46.933787],[11.36801,46.933709],[11.367972,46.933584],[11.367891,46.933564],[11.367689,46.933535],[11.367479,46.93352],[11.367266,46.933599],[11.367149,46.933605],[11.367039,46.933612],[11.366614,46.933775]],"type":"LineString"},"id":"f143baac61c054b012a373cbd452f2dd"},{"type":"Feature","properties":{"title":"Seggiovia Landurns","description":"","id":"marker-icdvoecg1","stroke":"#6c6c6c","stroke-width":4,"stroke-opacity":1},"geometry":{"coordinates":[[11.3769,46.943538],[11.371536,46.939949],[11.365978,46.936139]],"type":"LineString"},"id":"fe191e4b481c5170e4fc0d92cd9d61f5"}],"id":"samueleferrari.mpao2mk0"});
    newMapData.save();*/
    
  /*  var newMapc = new mapCheckpoint({
        mapId: "samueleferrari.mpao2mk0",
        routeId : "34",
        checkpointId: "1",
        directions : "Si puo procedere verso il sentiero 34 andando a destra.",
        directionsImg : "http://s3.onthesnow.com/images/trailmaps/sudtirol/ladurns-colle-isarco/20140122104920/large.jpg",
        title : "Checkpoint 1",
        description : "Siamo al primo checkpoint del sentiero 34"
    });
newMapc.save();*/
   
    
    console.log("Saved record");

    
  /*  map.find({"mapId":"samueleferrari.35521487"},{ '_id': 0, 'accessToken' :1, 'mapId': 1, 'name': 1, 'folderName': 1, 'maxZoom': 1, 'minZoom':1, 'southWestBound' : 1, 'northEastBound' : 1}, function(err, docs){
        res.send(docs);
    });*/
    
     map.find({"mapId":"samueleferrari.mpao2mk0"},{ '_id': 0 }, function(err, docs){
        res.send(docs);
    });
  
});

module.exports = router;
