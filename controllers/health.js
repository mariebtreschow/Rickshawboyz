"use strict";

let self = module.exports = {

    status : 'Health check is working',

    check : function(req, res){

        res.send({ online: self.status });
    }
};
