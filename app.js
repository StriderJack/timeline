'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 3000;

var environment = process.env.NODE_ENV;

app.use(favicon(__dirname + '/favicon.png'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(express.static(__dirname));
app.use('/', express.static(__dirname + '/index.html'));

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') +
      '\n__dirname = ' + __dirname  +
      '\nprocess.cwd = ' + process.cwd());
});
