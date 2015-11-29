define(['frameworks/angular', 'app/repository/eventRepository', 'app/routing', 'app/Configurations' ,'libraries/angularRoute'],
		function (Angular, EventRepository, routeConfig, Configurations) {
			'use strict';

			/* modules */
			var Lafete = Angular.module('lafete',['ngRoute'])
                .value('Configuration', Configurations)
                .service('EventRepository', EventRepository)
                .config(routeConfig);

			return Lafete;
		});