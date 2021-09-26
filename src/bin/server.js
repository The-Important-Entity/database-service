'use strict';
require("dotenv").config();
const config = require("../config");
const DatabaseService = require("..");


var server = new DatabaseService(config);

server.start().then(function(serv){
    function terminate() {
        serv.stop().then(function(){
            process.exit(0);
        }).catch(function(err) {
            console.log(err);
            process.exit(1);
        })
    }

    process.on("SIGINT", terminate);
    process.on("SIGTERM", terminate);
}).catch(function(err) {
    console.log(err);
    process.exit(1);
})
