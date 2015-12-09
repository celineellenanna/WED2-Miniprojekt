define(['app/model/event'], function(Event) {
    'use strict';

    var EventListController = function($scope, eventRepository) {
        this.scope = $scope;
        eventRepository.all(
            function(events) {
                this.scope.events = events;
            }.bind(this),
            function() {}
        );
    };

    EventListController.$inject = ['$scope', 'EventRepository'];

    return EventListController;
});