'use strict';
 
module.exports = ['$resource', function($resource) {
				var ctrl = this;
			  	this.words=[];
			  	var listResource = $resource('https://gre-reminder-service.herokuapp.com/word');
				var wholeList = listResource.query({all: true}, ()=>this.words=wholeList );
				function updateList(){
					let wholeList = listResource.query({all: true}, ()=>ctrl.words=wholeList );
				}
				this.onSubmit = ()=>listResource.save({word: ctrl.newWord},{},()=>{
					ctrl.newWord='';
					updateList();
				});
				this.onDelete = (word)=>listResource.delete({word: word},{},updateList);
			  }];