define(['app/model/event', 'app/model/guest'], function(Event, Guest) {
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
         * @param int id
         * @param Event event
         */
        this.update = function(id, event, successCallback, errorCallback ){
            $http.post( Configuration.urls.update.replace('{eventId}',id), event)
                .success(function(eventDTO){
                    successCallback(Event.createFromDTO(eventDTO));
                }).
            error(function(){
                errorCallback();
            })
        };

        /**
         * Add guest to event
         * @param int id
         * @param Guest guest
         */
        this.addGuestToEvent = function(id, guest, successCallback, errorCallback ){
            $http.post( Configuration.urls.addGuest.replace('{eventId}',id), guest)
                .success(function(guestDTO){
                    successCallback(Guest.createFromDTO(guestDTO));
                })
                .error(function(){
                    errorCallback();
            })
        };

        /**
         * Update guest on event
         * @param int eventId
         * @param int guestId
         * @param Guest guest
         */
        this.updateGuest = function(eventId, guestId, guest, successCallback, errorCallback ){
            // $http.get( Configuration.urls.updateGuest.replace('{eventId}',eventId).replace('{guestId}',guestId))
            $http.post( '/api/events/' + eventId + '/guests/' +guestId, guest )
                .success(function() {
                   successCallback();
                })
                .error(function(){
                    errorCallback();
                })
        };

        /**
         * Get Event by Id
         * @param int eventId
         * @param int guestId
         */

        this.getGuest = function(eventId, guestId, successCallback, errorCallback ){
           // $http.get( Configuration.urls.updateGuest.replace('{eventId}',eventId).replace('{guestId}',guestId))
            $http.get( '/api/events/' + eventId + '/guests/' +guestId )
                .success(function(guestDTO) {
                    successCallback(Guest.createFromDTO(guestDTO));
                })
                .error(function(){
                    errorCallback();
                })
        };

    };

    EventRepository.$inject = ['$http', 'Configuration'];

    return EventRepository;
});