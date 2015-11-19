define(['frameworks/angular', 'app/controllers/eventListController'],
function (Angular, EventListController) {
	'use strict';

	var Lafete = Angular.module('lafete', []);
	Lafete.controller('EventListController', EventListController);
	EventListController.$inject = ['$scope'];

	return Lafete;
});