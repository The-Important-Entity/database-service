'use strict';
const {Client} = require("pg");

class DBConnector {
    constructor(host, port, username, password, database) {
        this.client = new Client({
            "host": host,
            "user": username,
            "password": password,
            "database": database,
            "port": port,
        });

        this.client.connect();
    }

    async makeQuery(query, params) {
        try {
            const response = await this.client.query(query, params);
            return response.rows;
        }
        catch(err) {
            return err;
        }
    }

    async getOrganization(name) {
        return await this.makeQuery("SELECT * FROM organization.organization WHERE organization.organization.name=$1", [name]);
    }

    async postOrganization(name) {
        return await this.makeQuery("INSERT INTO organization.organization(name) VALUES ($1)", [name]);
    }

    async deleteOrganization(name) {
        return await this.makeQuery("DELETE FROM organization.organization WHERE organization.organization.name=$1", [name]);
    }

    async getAllSecurityGroups(name) {
        return await this.makeQuery("SELECT organization.security_groups.* FROM organization.organization,organization.security_groups where organization.organization.name=$1", [name]);
    }
    
    async getSecurityGroup(id) {
        return await this.makeQuery("SELECT * FROM organization.security_groups WHERE organization.security_groups.id=$1", [id]);
    }

    async postSecurityGroup(org_id, alias) {
        return await this.makeQuery("INSERT INTO organization.security_groups(org_id, alias) VALUES ($1, $2)", [org_id, alias]);
    }

    async updateSecurityGroup(group_id, alias) {
        return await this.makeQuery("UPDATE organization.security_groups SET organization.security_groups.alias=$2 WHERE organization.security_groups.id=$1", [group_id, alias]);
    }

    async deleteSecurityGroup(group_id) {
        return await this.makeQuery("DELETE FROM organization.security_groups WHERE organization.security_groups.id=$1", [group_id]);
    }

    async getSecurityPerms(group_id) {
        return await this.makeQuery("SELECT * FROM organization.security_perms WHERE organization.security_perms.group_id=$1", [group_id]);
    }

    async postSecurityPerm(group_id, namespace, read_perm, write_perm) {
        return await this.makeQuery("INSERT INTO organization.security_perms(group_id, namespace, read_perm, write_perm) VALUES ($1, $2, $3, $4)", [group_id, namespace, read_perm, write_perm]);
    }

    async updateSecurityPerm(group_id, namespace, read_perm, write_perm) {
        return await this.makeQuery("UPDATE organization.security_perms SET organization.security_perms.namespace=$2, organization.security_perms.read_perm=$3, organization.security_perms.write_perm=$4 WHERE organization.security_perms.group_id=$1", [group_id, namespace, read_perm, write_perm]);
    }

    async deleteSecurityPerm(id) {
        return await this.makeQuery("DELETE FROM organization.security_perms WHERE organization.security_perms.id=$1", [id]);
    }

    async getAllNamespaces(org_id) {
        return await this.makeQuery("SELECT * FROM organization.namespaces WHERE organization.namespaces.org_id=$1", [org_id]);
    }

    async postNamespace(org_id, name) {
        return await this.makeQuery("INSERT INTO organization.namespaces(org_id, name) VALUES ($1, $2)", [org_id, name]);
    }

    async deleteNamespace(name) {
        return await this.makeQuery("DELETE FROM organization.namespaces WHERE organization.namespaces.name=$1", [name]);
    }

    async getAccessKeys()

    close(){
        this.client.end();
    }
}

module.exports = DBConnector;