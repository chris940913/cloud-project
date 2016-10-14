var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var io= require('socket.io')();

var db = require('./config/database');

var routes = require('./routes/index');
var userRoutes = require('./routes/user');
var advRoutes = require('./routes/advertise');
var chatRoutes = require('./routes/chat');

var app = express();

app.io = require('socket.io')();



//app.set('port',process.env.PORT || 8080);


app.use('/static', express.static(__dirname + '/public'))

mongoose.connect(db.local);
require('./config/passport');

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({secret: 'mysupersecret', resave: false, saveUninitialized: false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
});

app.use('/user', userRoutes);
app.use('/', routes);
app.use('/advertise',advRoutes);
app.use('/chat',chatRoutes);


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

app.io.on('connection',function(socket){
  socket.on('postMessage', function(data) {
     app.io.emit('updateMessages', data);
   });
});


module.exports = app;
// var server = app.listen(app.get('port'), function() {
//   console.log('Listening on port ' + app.get('port'));
// });
