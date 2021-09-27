'use strict';
const express = require("express");
const DBConnector = require("./dbconnector");

const {getOrganization, postOrganization, updateOrganization, deleteOrganization} = require("./routes/organization.js");
const {getSecurityGroups, postSecurityGroup, updateSecurityGroup, deleteSecurityGroup} = require("./routes/security_groups.js");
const {getSecurityPerms, postSecurityPerm, updateSecurityPerm, deleteSecurityPerm} = require("./routes/security_perms.js");
const {getAllNamespaces, postNamespace, deleteNamespace} = require("./routes/namespace.js");
//const {getSecret, putAccessKey, deleteAccessKey} = require("./routes/access_keys.js");

class Router {
    constructor(config) {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.port = config.PORT;
        this.dbconn = new DBConnector(config.HOST, config.DB_PORT, config.DB_USER, config.DB_PASS, config.DB);

        this.app.get("/organization", getOrganization.bind(this));
        this.app.post("/organization", postOrganization.bind(this));
        this.app.update("/organization", updateOrganization.bind(this));
        this.app.delete("/organization", deleteOrganization.bind(this));

        this.app.get("/security_group", getSecurityGroups.bind(this));
        this.app.post("/security_group", postSecurityGroup.bind(this));
        this.app.update("/security_group", updateSecurityGroup.bind(this));
        this.app.delete("/security_group", deleteSecurityGroup.bind(this));

        this.app.get("/security_perm", getSecurityPerms.bind(this));
        this.app.post("/security_perm", postSecurityPerm.bind(this));
        this.app.update("/security_perm", updateSecurityPerm.bind(this));
        this.app.delete("/security_perm", deleteSecurityPerm.bind(this));

        this.app.get("/namespace", getAllNamespaces.bind(this));
        this.app.post("/namespace", postNamespace.bind(this));
        this.app.delete("/namespace", deleteNamespace.bind(this));

        // this.app.get("/access_key", getSecret.bind(this));
        // this.app.post("/access_key", putAccessKey.bind(this));
        // this.app.delete("/access_key", deleteAccessKey.bind(this));

        this.test_appid = new RegExp('^[A-Z0-9]{50,}$')
    }

    

    start() {
        try {
            this.server = this.app.listen(this.port, function(){
                console.log("Auth Service listening on port " + this.port.toString());
            }.bind(this));
        }
        catch(err) {
            throw(err);
        }
    }

    stop(){
        try {
            this.server.close();
            this.dbconn.close();
        }
        catch(err) {
            throw err;
        }
    }
}

module.exports = Router;