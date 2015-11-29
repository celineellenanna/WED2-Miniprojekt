define(['app/model/event'], function(Event) {
    'use strict';

    var EventRepository = function($http, Configuration) {
        /**
         * Get all events
         *
         * @return Event[]
         */
        this.all = function(successCallback, errorCallback) {
            $http.get(Configuration.urls.all)
                .success(function(data) {
                    // map applys a function on every element in the array and returns the result as new array
                    var events = data.events.map(function(eventDTO) {
                        return Event.createFromDTO(eventDTO);
                    });
                    successCallback(events);
                })
                .error(errorCallback);
        };

        /**
         * Find event by identifier
         *
         * @param string identifier
         */
        this.get = function(event, successCallback, errorCallback) {
            $http.get(Configuration.urls.byId.replace('{eventId}', event.id))
                .success(function(eventDTO) {
                    successCallback(Event.createFromDTO(eventDTO));
                })
                .error(errorCallback);
        };

        /**
         * Add event
         * @param Event event
         */
        this.add = function(event, successCallback, errorCallback) {
            $http.post(Configuration.urls.add, event)
                .success(function(eventDTO) {
                    successCallback(Event.createFromDTO(eventDTO));
                })
                .error(errorCallback);
        };

        /**
         * Update event
         * @param Event event
         */
        this.update = function(id, event, successCallback, errorCallback ){
            $http.post( Configuration.urls.update.replace('{eventId}',id), event)
            .success(function(){
                successCallback(Event.createFromDTO(eventDTO));
            }).
            error(function(){
                errorCallback();
            })
        };
    };

    EventRepository.$inject = ['$http', 'Configuration'];

    return EventRepository;
});