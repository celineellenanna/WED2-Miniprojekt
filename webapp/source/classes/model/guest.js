define([], function(){
    'use strict';

    var guest = function(id, name, contribution, comment, canceled)
    {
        this.id = id;
        this.name = name;
        this.contribution = contribution;
        this.comment = comment;
        this.canceled = canceled;
    };
});