define([], function() {
    'use strict';

    var EventDetailController = function($scope, $routeParams, EventRepository) {
        $scope.attendingGuests = 0;
        EventRepository.get(
            { id:$routeParams.eventId },
            function(event) {
                $scope.event = event;
                event.guests.forEach(function(guest){
                    if(!guest.canceled){
                        $scope.attendingGuests++;
                    }
                });
            }.bind(this),
            function() {}
        );


    }
    EventDetailController.$inject = ['$scope', '$routeParams', 'EventRepository'];

    return EventDetailController;
});