'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var cloud = require('./cloud');
//zhaozhenyu add
var pingpp_pay = require('./routes/pingpp_pay');

var app = express();

app.use(express.static('public'));
app.use(cloud);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//zhaozhenyu add
app.use('/pingpp_pay', pingpp_pay);

app.use(function(request, response, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, request, response, next) {
        response.status(err.status  || 500);
        response.send({
            message: error.message,
            error: err
        });
    });
}

app.use(function(err, request, response, next) {
    response.status(err.status || 500);
    response.send({
        message: err.message,
        error: {}
    });
});

module.exports = app;
