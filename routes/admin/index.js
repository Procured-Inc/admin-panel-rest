var express = require('express');
var router = express.Router();
var http = require('http');
var connection = require('../../connection/mysql');

var app = express();

var auth = require('./auth');
var details = require('./details');
var college = require('./college');
var test = require('./test');
var results = require('./results');
var students = require('./student');



app.use('/auth', auth);
app.use('/details', details);
app.use('/college', college);
app.use('/test', test);
app.use('/results', results);
app.use('/student', students);



module.exports = app;