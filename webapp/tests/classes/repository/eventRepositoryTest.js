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

         /*   describe('get()', function() {
                beforeEach(function() {
                    eventRepository.add(event,function(eventDTO){console.log("success");}, function(){console.log("fail");});

                    //eventRepository.all(function(events){console.log(events);},function(){});
                });

                describe('by object id', function() {
                    it('returns the object', function() {
                        expect(eventRepository.get(event, function () {}, function(){})).toEqual(event);
                    });
                });

                describe('by inexistent object id', function() {
                    it('returns null', function() {
                        expect(eventRepository.get(null, function () {}, function(){})).toEqual(null);
                        expect(eventRepository.get('abvhf74n6', function () {}, function(){})).toEqual(null);
                    });
                });
            });
            */

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
                it('inserts element', function() {
                    var status1 = false;
                    eventRepository.add(event, function () {console.log("success"); status1 = true}, function(){console.log("fail");});

                    $httpBackend.flush();

                    expect(status1).toBe(true);
                });
            });

            describe('update()', function(){
                it('updates an event', function(){
                    var event1, updatedevent;
                    eventRepository.get(1,function(eventdto){
                        event1 = eventdto;

                    }, function(){});
                    $httpBackend.flush();

                    event1.name = "HSR Party";

                    eventRepository.update(event1.id, event1, function(eventdto){
                        updatedevent = eventdto;
                    }, function(){});
                    $httpBackend.flush();
                    expect(updatedevent).toEqual(event1);
                });
            });

        });
    });