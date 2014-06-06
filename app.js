"use strict";

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//use this for deploing on heroku mongodb://localhost:27017/noderest2
var mongo = require('mongoskin');
var db = mongo.db("mongodb://test_user:12345678@kahana.mongohq.com:10085/app26073096", {native_parser: true});

var routes = require('./routes/index');
var students = require('./routes/students');
var groups = require('./routes/groups');
var forumNotes = require('./routes/forumNotes');

var app = express();

// view engine setup
/*jslint nomen: true*/
app.set('views', path.join(__dirname, 'views'));
/*jslint nomen: false*/
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
/*jslint nomen: true*/
app.use(express.static(path.join(__dirname, 'public')));
/*jslint nomen: false*/

// Make mongoDB accessible to the router
app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/students', students);
app.use('/groups', groups);
app.use('/forumNotes', forumNotes);

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
