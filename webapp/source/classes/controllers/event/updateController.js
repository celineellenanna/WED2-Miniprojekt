/**
 * Created by Céline on 26.11.2015.
 */
define(['app/model/event'], function(Event) {
    'use strict';

    var EventUpdateController = function($scope, $location, EventRepository, $routeParams){
        this.scope = $scope;
        this.scope.event = new Event();
        var eventId = $routeParams.eventId;


        EventRepository.get(
            $routeParams.eventId,
            function(event) {
                this.scope.event = event;
                this.scope.event.times.begin = new Date(event.times.begin);
                this.scope.event.times.end = new Date(event.times.end);
        }.bind(this),
            function() {}
        );

        this.scope.update = function(event){

            $scope.event = event;
            EventRepository.update(eventId, event, function(event) {
                $location.path('/events/'+event.id);
            }, function(){});

        }
    };

    EventUpdateController.$inject = ['$scope', '$location', 'EventRepository', '$routeParams'];

    return EventUpdateController;

});