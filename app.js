var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose'); // Node js MongoDb package
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var MongoStore= require('connect-mongo');
var MongoCollection = require('connect-mongodb-session')(session);

// For previous error in code. The error is fixed, unsure if this row is necessary.
var {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

// Require the Javascript index file. Set up Express
var indexRouter = require('./routes/index');
var app = express();

// Connection to the Mongo Database server
mongoose.connect('mongodb://localhost:27017/reviews');
require('./config/passport');

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

// Additional Express middleware. A Session is setup for the server and database.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
    secret: 'protectuser',
    resave: false,
    saveUninitialized: false,
    store: new MongoCollection({mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 240 * 60 * 1000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// Additional code for the Session.
app.use(function (req,res,next){
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

// Use the route
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
