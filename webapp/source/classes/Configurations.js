define([], function(){
   return {
       urls: {
           all: '/api/events',
           byId: '/api/events/{eventId}',
           add: '/api/events',
           update: '/api/events({eventId}'
       }
   };
});