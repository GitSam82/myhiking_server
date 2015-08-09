var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var db = require('./models/db');

//===========Routes=========================
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


//===========Apply Maps Routes=========================
app.use('/', routes);
app.use('/users', users);
app.use('/partials', partials);
app.use('/map',map);
//===============================================

/*var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3001 ;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
 
app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port );
});*/

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3001);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

http.createServer(app).listen(app.get('port') ,app.get('ip'), function () {
    console.log("✔ Express server listening at %s:%d ", app.get('ip'),app.get('port'));
});


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
