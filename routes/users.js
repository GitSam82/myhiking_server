var express = require('express');
var user = require('../models/users'); 
var passport = require('passport');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('partials/index');
});

/*POST create a new user*/
router.post('/create', function(req, res, next) {
    var newUser = new user(req.body);
    newUser.save(function (err) {
        if (err) {
            console.log(err);
            res.send( { "code":"KO", "message": err.message });
        }else{
            console.log("User created succesfully");
            res.send( { "code":"OK"});
        }
    });
     
});

/*GET create a new user*/
router.get('/login', 
          // passport.authenticate('local', { 
            //                       failureRedirect: '/users/',
              //                     failureFlash: false }),
           
           function(req, res, next) {
    var userName = req.query.userName;
    var pass = req.query.pass;
    
    user.find({"email":userName, "password":pass},{ '_id': 0 }, function(err, docs){
        if(docs.length==1){
            res.send( { "code":"OK", userData : docs});
        }else if(docs.length==0){
            res.send( { "code":"KO", "message": "No user found" });
        }else{
            res.send( { "code":"KO", "message": "More users with the same email" });
        }
    });
    
     
});

module.exports = router;
