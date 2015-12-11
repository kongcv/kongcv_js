'use strict'
var AV = require('leanengine');
var APP_ID = process.env.LC_APP_ID;
var APP_KEY = process.env.LC_APP_KEY;
var MASTER_KEY = process.env.LC_APP_MASTER_KEY;

AV.initialize(APP_ID, APP_KEY, MASTER_KEY);

var app = require('./app');
var port = parseInt(process.env.LC_APP_PORT || 3000 || 8010);
app.listen(port, function() {
    console.log('Node app is running, port:', port);
});
