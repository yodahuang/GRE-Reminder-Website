'use strict';
var myFireBase = require('../../fireBase/index');

module.exports = ['$firebaseArray', function($firebaseArray) {
	componentHandler.upgradeAllRegistered();
	var ctrl = this;
	var ref = myFireBase.database().ref();
	this.words = $firebaseArray(ref);
	this.onSubmit = ()=>{
		ctrl.words.$add(ctrl.newWord);
		ctrl.newWord='';
	};
	this.onDelete = (word)=>ctrl.words.$remove(word);
}];