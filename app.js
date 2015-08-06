var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./models/db');

var user = require('./models/users'); 
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



//===========Maps Routes=========================
var map = require('./routes/map');
var routes = require('./routes/index');
var users = require('./routes/users');
var partials = require('./routes/partials');
//===============================================


var app = express();

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
      console.log("caneeeeee" + username);
    user.findOne({ email: username }, function(err, user) {
      if (err) { console.log("dddddd"); return done(err); }
      if (!user) {
          console.log("XXXx");
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
          console.log("XXXx3333333");
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


//===========Apply Maps Routes=========================
app.use('/', routes);
app.use('/users', users);
app.use('/partials', partials);
app.use('/map',map);
//===============================================


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
