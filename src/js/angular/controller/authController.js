'use strict';
var authStart = require('../../fireBase/auth');

module.exports = ['$state', '$rootScope', function($state, $rootScope) {
	authStart((displayName, uid)=>{
        $rootScope.displayName = displayName;
        $rootScope.uid = uid;
        $state.go('list')
    });
}];