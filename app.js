var createError = require('http-errors');
var express = require('express');
var exphbs = require('express-handlebars'); // set handlebars as the view engine
var sassMiddleware = require('node-sass-middleware'); // set sass as the css pre-processor
var browserify = require('browserify-middleware'); // get browserify
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goals = require("./routes/goals"); // load router to the app

var app = express();

// view engine setup
app.engine('hbs', exphbs({extname: '.hbs', defaultLayout: 'layout'})); // handlebar view engine code
app.set('view engine', 'hbs');

// css pre-processor setup
app.use(
  sassMiddleware({
    src: __dirname + '/sass',
    dest: __dirname + '/public',
    debug: true,
  })
);

// browserify setup
app.get('/javascripts/bundle.js', browserify('./client/script.js'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/goals", goals); // set router to be used by app

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
