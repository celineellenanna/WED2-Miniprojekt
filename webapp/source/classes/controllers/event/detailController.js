define([], function() {
    'use strict';

    var EventDetailController = function($scope, $routeParams, EventRepository, location) {
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

        $scope.editEvent = function()
        {
            location.path('/events/update/'+$scope.event.id);
        }
    }
    EventDetailController.$inject = ['$scope', '$routeParams', 'EventRepository', '$location'];

    return EventDetailController;
});