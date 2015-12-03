define(['app/model/guest'], function(Guest) {
    'use strict';

    var NewGuestController = function($scope, $location, EventRepository, $routeParams) {

        var eventId = $routeParams.eventId;
        $scope.guest = new Guest();

        $scope.add = function() {

            EventRepository.addGuestToEvent(eventId,
                $scope.guest,
                function() {
                    $location.path('/events/'+eventId);
                },
                function() {}
            );
        };
    };

    NewGuestController.$inject = ['$scope', '$location', 'EventRepository', '$routeParams'];

    return NewGuestController;
});