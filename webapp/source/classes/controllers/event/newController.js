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
    NewEventController.prototype.createNumberSerie = function(start, step, end, digits) {
        digits = digits || 3;
        var serie = [];
        for(var i = start; i <= end; i+=step) {
            var digit = (1e10 + i + "").slice(-digits);
            serie.push(digit);
        }
        return serie;
    };

    NewEventController.$inject = ['$scope', '$location', 'EventRepository'];

    return NewEventController;
});