define(['app/model/event'], function(Event) {
    'use strict';

    var NewEventController = function($scope, $location, EventRepository) {
        this.scope = $scope;
        this.scope.event = new Event();

        this.scope.add = function(newEvent) {

            EventRepository.add(
                newEvent,
                function(event) {
                    $location.path('/events/'+event.id);
                },
                function() {}
            );
        };
    };


    NewEventController.$inject = ['$scope', '$location', 'EventRepository'];

    return NewEventController;
});