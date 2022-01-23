const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(logger('dev'));

// accept request in form or JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cors
app.use(cors());

// passport
const passport = require('./lib/passport');
app.use(passport.initialize());

// routes
const Router = require('./routes');
app.use(Router);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
