'use strict';

require('angular');
require('angularfire');
require('angular-ui-router');

var app = angular.module('wordReminder', ['firebase', 'ui.router']);

require('./controller');
require('./router');