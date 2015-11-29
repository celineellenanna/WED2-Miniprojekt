define(['app/controllers/event/listController', 'app/controllers/event/detailController', 'app/controllers/event/newController', 'app/controllers/event/updateController'],
    function( EventListController, EventDetailController, NewEventController, EventUpdateController) {
    'use strict';

    var config = function($routeProvider) {
        $routeProvider.when('/list', {
                controller: EventListController,
                templateUrl: '/views/event/list.html'
            })
            .when('/events/new', {
                controller: NewEventController,
                templateUrl: '/views/event/edit.html'
            })
            .when('/events/:eventId', {
                controller: EventDetailController,
                templateUrl: '/views/event/detail.html'
            })
            .when('/events/update/:eventId', {
                controller: EventUpdateController,
                templateUrl: '/views/event/update.html'
            })
            .otherwise({
                redirectTo: '/list'
            });
    };

    config.$inject = ['$routeProvider'];

    return config;
});