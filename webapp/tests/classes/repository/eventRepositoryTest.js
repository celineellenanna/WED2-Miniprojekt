define(['tests/factories/eventFactory', 'app/model/event', 'app/repository/eventRepository', 'libraries/angularMocks', 'app/Configurations'],
    function (EventFactory, Event, EventRepository, AngularMocks, Configurations) {
        'use strict';

        describe('EventRepository', function() {
            var event, eventRepository, $http, $httpBackend;

            // setup
            beforeEach(AngularMocks.inject(function($injector) {
                $http = $injector.get('$http');
                $httpBackend = $injector.get('$httpBackend');

                eventRepository = new EventRepository($http, Configurations);
                event = EventFactory.createEvent();

                $httpBackend.when('GET', '/api/events').respond({
                    events: [{id: 1, name: 'Party'},{id: 2, name: 'Concert'}]
                });
                $httpBackend.when('POST', '/api/events').respond({
                    events: [{id: 1, name: 'Party'},{id: 2, name: 'Concert'}]
                });
                $httpBackend.when('GET', '/api/events/1').respond({
                   id: 1, name: 'Party'
                });
                $httpBackend.when('POST', '/api/events/1').respond({
                    id: 1, name: 'HSR Party'
                });
            }));

            afterEach(function() {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });



            describe('all()', function() {
                it('returns an Array', function() {
                    $httpBackend.expectGET('/api/events');
                    var events = null;
                    eventRepository.all(function(eventList) {
                        events = eventList;
                    },function(){});
                    $httpBackend.flush();
                    expect(events).toEqual(jasmine.any(Array));
                });

                it('returns two events', function() {
                    $httpBackend.expectGET('/api/events');
                    var events = null;
                    eventRepository.all(function(eventList) {
                        events = eventList;
                    },function () {});
                    $httpBackend.flush();
                    expect(events.length).toEqual(2);
                });

                it('returns real javascript objects', function() {
                    $httpBackend.expectGET('/api/events');
                    var events = null;
                    eventRepository.all(function(eventList) {
                        events = eventList;
                    }, function(){});
                    $httpBackend.flush();
                    expect(events[0]).toEqual(jasmine.any(Event));
                    expect(events[1]).toEqual(jasmine.any(Event));
                });
            });

            describe('add()', function() {
                beforeEach(function() {
                    $httpBackend.expectPOST('/api/events');
                });
                it('inserts element', function() {
                    var status1 = false, event2;
                    eventRepository.add(event, function (newevent) {console.log("success"); status1 = true; event2 = newevent;}, function(){console.log("fail");});

                    $httpBackend.flush();

                    expect(status1).toBe(true);
                    expect(typeof event2).toBe("object");
                    expect(event2).toEqual(jasmine.any(Event));
                });
            });

            describe('update()', function(){
                beforeEach(function() {
                    $httpBackend.expectPOST('/api/events/1');
                });
                it('updates an event', function(){
                    var event1, updatedevent;
                    event1 = EventFactory.createEvent(1);

                    event1.name = "HSR Party";

                    eventRepository.update(event1.id, event1, function(eventdto){
                        updatedevent = eventdto;
                    }, function(){});
                    $httpBackend.flush();
                    expect(updatedevent.name).toEqual(event1.name);
                    expect(typeof event1).toBe("object");
                    expect(updatedevent).toEqual(jasmine.any(Event));
                });
            });

        });
    });