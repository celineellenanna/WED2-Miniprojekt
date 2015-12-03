define(['app/services/uuidService'], function(UUIDService){
    'use strict';

    var Guest = function(id, name, contribution, comment, canceled)
    {
        this.id = id|| UUIDService.getRandomUuid();
        this.name = name;
        this.contribution = contribution;
        this.comment = comment;
        this.canceled = canceled;
    };

    /**
     * Create Guest object from data transfer object (json object)
     */
    Guest.createFromDTO = function(guestDTO) {
        var guest = new Guest(
            guestDTO.id,
            guestDTO.name,
            guestDTO.contribution,
            guestDTO.comment,
            guestDTO.canceled
        );
        return guest;
    };
    return Guest;
});