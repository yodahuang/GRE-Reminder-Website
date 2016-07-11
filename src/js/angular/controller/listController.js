'use strict';
var myFireBase = require('../../fireBase/index');

module.exports = ['$firebaseArray', '$rootScope', function($firebaseArray, $rootScope) {
	componentHandler.upgradeAllRegistered();
	var ctrl = this;
	var ref = myFireBase.database().ref().child($rootScope.uid);
	this.words = $firebaseArray(ref);
	this.onSubmit = ()=>{
		ctrl.words.$add(ctrl.newWord);
		ctrl.newWord='';
	};
	this.onDelete = (word)=>ctrl.words.$remove(word);
}];