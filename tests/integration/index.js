'use strict';
const axios = require("axios");
const { request } = require("express");

Array.prototype.equals = function (arr) {
    return this.length == arr.length && this.every((u, i) => u === arr[i]);
}

const run_tests = async function(tester, requester) {
    var res = await requester.get("http://localhost:6000/organization/tech-solutions");
    var info = "Test GET organization when organization doesn't exist";
    tester.assert(info, Array.isArray(res) && res.equals([]), true);

    res = await requester.delete("http://localhost:6000/organization/tech-solutions");
    info = "Test DELETE organization when organization doesn't exist";
    tester.assert(info, Array.isArray(res) && res.equals([]), true);

    res = await requester.post("http://localhost:6000/organization", {
        "name1": "tech-solutions",
        "email": "joe@gmail.com",
        "password": "1246fdgq43g"
    });
    info = "Test POST with bad request body";
    tester.assert(info, JSON.stringify(res), JSON.stringify({"error": "missing name or beta key in request body"}));

    res = await requester.post("http://localhost:6000/organization", {
        "name": "tech-solutions",
        "email": "joe@gmail.com",
        "password": "1246fdgq43g"
    });
    info = "Test POST organization when organization doesn't exist";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([{id: 1, "name": "tech-solutions","email": "joe@gmail.com", "password": "1246fdgq43g"}]), true);

    res = await requester.post("http://localhost:6000/organization", {
        "name": "tech-solutions",
        "email": "joe@gmail.com",
        "password": "1246fdgq43g"
    });
    info = "Test POST organization when organization exists";
    tester.assert(info, res, "Error: unique key violation");

    res = await requester.get("http://localhost:6000/organization/tech-solutions");
    info = "Test GET organization when organization exists";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([{id: 1, "name": "tech-solutions","email": "joe@gmail.com", "password": "1246fdgq43g"}]), true);

    res = await requester.get("http://localhost:6000/namespace/1");
    info = "Test GET all namespaces when organization exists and no namespace exists";
    tester.assert(info, Array.isArray(res) && res.equals([]), true);

    res = await requester.delete("http://localhost:6000/namespace/joe-namespace");
    info = "Test DELETE namespace when organization exists and no namespace exists";
    tester.assert(info, Array.isArray(res) && res.equals([]), true);

    res = await requester.post("http://localhost:6000/namespace", {
        "org_id": 1,
        "name": "joe-namespace"
    });
    info = "Test POST namespace when organization exists and namespace doesn't exist";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([{id: 1, org_id: 1, name: 'joe-namespace'}]), true);

    res = await requester.get("http://localhost:6000/namespace/1");
    info = "Test GET all namespaces when organization exists and namespaces exists";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([{id: 1, org_id: 1, name: 'joe-namespace'}]), true);

    res = await requester.post("http://localhost:6000/namespace", {
        "org_id": 1,
        "name": "joe-namespace"
    });
    info = "Test POST namespace when organization exists and namespace already exists";
    tester.assert(info, res, 'Error: unique key violation');

    res = await requester.get("http://localhost:6000/security_group/1");
    info = "Test GET security group when organization exists and no security groups exist";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([]), true)
    
    res = await requester.delete("http://localhost:6000/security_group/1");
    info = "Test DELETE security group when organization exists and no security groups exist";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([]), true)

    res = await requester.put("http://localhost:6000/security_group", {
        "group_id": 1,
        "alias": "newgroup1234"
    });
    info = "Test PUT security group when organization exists and security groups doesnt exist";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([]), true)

    res = await requester.post("http://localhost:6000/security_group", {
        "org_id": 1,
        "alias": "newgroup"
    });
    info = "Test POST security group when organization exists and no security groups exist";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([{"id": 1,"org_id": 1,"alias": "newgroup"}]), true)

    res = await requester.put("http://localhost:6000/security_group", {
        "group_id": 1,
        "alias": "newgroup1234"
    });
    info = "Test PUT security group when organization exists and security groups exists";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([{"id": 1,"org_id": 1,"alias": "newgroup1234"}]), true)

    res = await requester.get("http://localhost:6000/security_perm/1")
    info = "Test GET security perms when no security perms exist";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([]), true);

    res = await requester.put("http://localhost:6000/security_perm", {
        "id": 1,
        "namespace": "joe-namespace",
        "read_perm": 1,
        "write_perm": 1
    })
    info = "Test PUT security perms when no security perms exist";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([]), true);

    res = await requester.delete("http://localhost:6000/security_perm/1")
    info = "Test DELETE security perms when no security perms exist";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([]), true);

    res = await requester.post("http://localhost:6000/security_perm", {
        "group_id": 1,
        "namespace": "joe-namespace",
        "read_perm": 1,
        "write_perm": 1
    })
    info = "Test POST security perms when no security perms exist";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([{
        "id": 1,
        "group_id": 1,
        "namespace": "joe-namespace",
        "read_perm": 1,
        "write_perm": 1
    }]), true);


    res = await requester.get("http://localhost:6000/security_perm/1")
    info = "Test GET security perms when security perms exist";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([{
        "id": 1,
        "group_id": 1,
        "namespace": "joe-namespace",
        "read_perm": 1,
        "write_perm": 1
    }]), true);

    res = await requester.put("http://localhost:6000/security_perm", {
        "id": 1,
        "namespace": "joe-namespace",
        "read_perm": 0,
        "write_perm": 1
    })
    info = "Test PUT security perms when security perms exist";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([{
        "id": 1,
        "group_id": 1,
        "namespace": "joe-namespace",
        "read_perm": 0,
        "write_perm": 1
    }]), true);

    res = await requester.get("http://localhost:6000/access_key/1")
    info = "Test GET access keys when no access keys exist";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([]), true);

    res = await requester.delete("http://localhost:6000/access_key/1234321")
    info = "Test DELETE access keys when no access keys exist";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([]), true);

    res = await requester.post("http://localhost:6000/access_key", {
        "group_id": 1,
        "app_id": "abwirbgasubg3b42b5",
        "secret": "supersecretstring"
    });
    info = "Test POST access key when no access keys exist";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([{
        "id": 1,
        "group_id": 1,
        "app_id": "abwirbgasubg3b42b5",
        "secret": 'supersecretstring'
    }]), true)

    res = await requester.get("http://localhost:6000/access_key/1")
    info = "Test GET access keys when access keys exists";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([{
        "id": 1,
        "group_id": 1,
        "app_id": "abwirbgasubg3b42b5"
    }]), true);

    res = await requester.post("http://localhost:6000/secret_key", {
        "app_id": "abwirbgasubg3b42b5",
        "namespace":"joe-namespace"
    });
    info = "Test Getting secret key with permissions";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([{
        "group_id": 1,
        "secret": 'supersecretstring',
        "read_perm": 0,
        "write_perm": 1
    }]), true)











    res = await requester.delete("http://localhost:6000/access_key/abwirbgasubg3b42b5");
    info = "Test DELETE access key when access key exists";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([{
        "id": 1,
        "group_id": 1,
        "app_id": "abwirbgasubg3b42b5"
    }]), true)

    res = await requester.delete("http://localhost:6000/security_perm/1")
    info = "Test DELETE security perms when security perms exist";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([{
        "id": 1,
        "group_id": 1,
        "namespace": "joe-namespace",
        "read_perm": 0,
        "write_perm": 1
    }]), true);

    res = await requester.delete("http://localhost:6000/security_group/1");
    info = "Test DELETE security group when organization exists and security group exists";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([{"id": 1,"org_id": 1,"alias": "newgroup1234"}]), true)
    
    res = await requester.delete("http://localhost:6000/organization/tech-solutions");
    info = "Test DELETE organization when organization exists";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([{id: 1, "name": "tech-solutions","email": "joe@gmail.com", "password": "1246fdgq43g"}]), true)
}

module.exports = run_tests