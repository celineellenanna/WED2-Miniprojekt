define(['frameworks/angular', 'app/controllers/event/listController', 'app/controllers/event/detailController', 'app/controllers/event/newController', 'app/repository/eventRepository', 'libraries/angularRoute'],
		function (Angular, EventListController, EventDetailController, NewEventController, EventRepository) {
			'use strict';

			/* modules */
			var Lafete = Angular.module('lafete',['ngRoute']);

			Lafete.value('Configuration', {
				urls: {
					all: '/api/events',
					byId: '/api/events/{eventId}',
					add: '/api/events'
				}
			});

			/* services */
			EventRepository.$inject = ['$http', 'Configuration'];
			Lafete.service('EventRepository', EventRepository);

			/* controllers */
			EventListController.$inject = ['$scope', 'EventRepository'];
			Lafete.controller('EventListController', EventListController);

			EventDetailController.$inject = ['$scope', '$routeParams', 'EventRepository'];
			Lafete.controller('EventDetailController', EventDetailController);

			NewEventController.$inject = ['$scope', '$location', 'EventRepository'];
			Lafete.controller('NewEventController', NewEventController);

			/* routes */
			Lafete.config(function($routeProvider) {
				$routeProvider.when('/list', {
							controller: 'EventListController',
							templateUrl: '/views/event/list.html'
						})
						.when('/events/new', {
							controller: 'NewEventController',
							templateUrl: '/views/event/edit.html'
						})
						.when('/events/:eventId', {
							controller: 'EventDetailController',
							templateUrl: '/views/event/detail.html'
						})
						.otherwise({
							redirectTo: '/list'
						});
			});

			return Lafete;
		});