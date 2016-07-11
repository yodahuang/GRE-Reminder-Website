'use strict';
var app = require('angular').module('wordReminder');
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/login");
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "../../../html/partials/login.html",
      controller: 'authController'
    })
    .state('list', {
      url: "/list",
      templateUrl: "../../../html/partials/list.html",
      controller: 'listController',
      controllerAs: 'ctrl'
    })
});