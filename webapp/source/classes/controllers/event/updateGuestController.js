/**
 * Created by Céline on 03.12.2015.
 */
define(['app/model/guest'], function(Guest) {
    'use strict';

    var GuestUpdateController = function($scope, $location, EventRepository, $routeParams){

        $scope.guest = new Guest();

        EventRepository.getGuest($routeParams.eventId, $routeParams.guestId,
        function(guest){
        console.log(guest);
        $scope.guest = guest;
        },function(){}
        );



        $scope.update = function(){ console.log($scope.guest);
            EventRepository.updateGuest($routeParams.eventId, $routeParams.guestId, $scope.guest, function() {
                $location.path('/events/'+$routeParams.eventId);
            }, function(){});

        };
    };

    GuestUpdateController.$inject = ['$scope', '$location', 'EventRepository', '$routeParams'];

    return GuestUpdateController;

});