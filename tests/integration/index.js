'use strict';
const axios = require("axios");

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
        "beta_key": "TechSolutions2021"
    });
    info = "Test POST with bad request body";
    tester.assert(info, JSON.stringify(res), JSON.stringify({"error": "missing name or beta key in request body"}));

    res = await requester.post("http://localhost:6000/organization", {
        "name": "tech-solutions",
        "beta_key": "TechSolutions2021"
    });
    info = "Test POST organization when organization doesn't exist";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([{id: 1, name: 'tech-solutions'}]), true);

    res = await requester.post("http://localhost:6000/organization", {
        "name": "tech-solutions",
        "beta_key": "TechSolutions2021"
    });
    info = "Test POST organization when organization exists";
    tester.assert(info, res, "Error: unique key violation");

    res = await requester.get("http://localhost:6000/organization/tech-solutions");
    info = "Test GET organization when organization exists";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([{id: 1, name: 'tech-solutions'}]), true);

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

    res = await requester.delete("http://localhost:6000/organization/tech-solutions");
    info = "Test DELETE organization when organization exists";
    tester.assert(info, Array.isArray(res) && JSON.stringify(res) == JSON.stringify([{id: 1, name: 'tech-solutions'}]), true)
}

module.exports = run_tests