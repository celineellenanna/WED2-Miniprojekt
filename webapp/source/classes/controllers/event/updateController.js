/**
 * Created by Céline on 26.11.2015.
 */
define(['app/model/event'], function(Event) {
    'use strict';

    var EventUpdateController = function($scope, $location, EventRepository){

        this.scope = $scope;
        this.scope.hours = this.createNumberSerie(0,1,23,2);
        this.scope.minutes = this.createNumberSerie(0,5,59,2);
        this.scope.event = new Event();

        this.scope.update = function(newEvent) {
            newEvent.times.begin = new Date(
                newEvent.times.begin.date.getFullYear(),
                newEvent.times.begin.date.getMonth(),
                newEvent.times.begin.date.getDate(),
                newEvent.times.begin.time.hours,
                newEvent.times.begin.time.minutes,
                0
            );
            newEvent.times.end = new Date(
                newEvent.times.end.date.getFullYear(),
                newEvent.times.end.date.getMonth(),
                newEvent.times.end.date.getDate(),
                newEvent.times.end.time.hours,
                newEvent.times.end.time.minutes,
                0
            );

            EventRepository.update(
                newEvent,
                function(event) {
                    $location.path('/events/'+event.id);
                },
                function() {}
            );
        };
    };

    EventUpdateController.$inject = [];

    return EventUpdateController;

});