'use strict';
var app = require('angular').module('wordReminder');
 
app.controller('listController', require('./listController'))
    .controller('authController', require('./authController'));