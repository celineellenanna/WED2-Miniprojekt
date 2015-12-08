define([], function(){
   return {
       urls: {
           all: '/api/events',
           byId: '/api/events/{eventId}',
           add: '/api/events',
           update: '/api/events/{eventId}',
           addGuest: '/api/events/{eventId}/guests',
           updateGuest: '/api/events/:eventId/guests/:guestId'
       }
   };
});