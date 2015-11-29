define(['app/model/event'], function(Event) {
    'use strict';

    var EventListController = function($scope, eventRepository) {

        eventRepository.all(
            function(events) {
                $scope.events = events;
            }.bind(this),
            function() {}
        );
    };

    EventListController.$inject = ['$scope', 'EventRepository'];

    return EventListController;
});