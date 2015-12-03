define(['app/controllers/event/listController', 'app/controllers/event/detailController', 'app/controllers/event/newController', 'app/controllers/event/updateController', 'app/controllers/event/newGuestController','app/controllers/event/updateGuestController'],
    function( EventListController, EventDetailController, NewEventController, EventUpdateController, NewGuestController, GuestUpdateController) {
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
            .when('/events/:eventId/guest/new', {
                controller: NewGuestController,
                templateUrl: '/views/event/editGuest.html'
            })
            .when('/events/:eventId/guest/:guestId', {
                controller: GuestUpdateController,
                templateUrl: '/views/event/updateGuest.html'
            })
            .otherwise({
                redirectTo: '/list'
            });
    };

    config.$inject = ['$routeProvider'];

    return config;
});