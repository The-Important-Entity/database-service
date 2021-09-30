
// const getNamespacesByKey = async function(req, res) {
//     const temp;
// }

const postNamespaceInSecurityGroup = async function(req, res) {
    const group_id = req.body.group_id;
    const namespace = req.body.namespace;

    if (!group_id || !namespace) {
        res.status(400).send({
            "error": "missing group id or name in request body"
        });
        return
    }

    const group = await this.dbconn.getSecurityGroup(group_id);
    if (group.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }

    const org_id = group[0].org_id;

    const step1 = await this.dbconn.postNamespace(org_id, namespace);
    if (step1.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }

    const step2 = await this.dbcon.postSecurityPerm(group_id, namespace)
    if (step2.code) {
        await this.dbconn.deleteNamespace(namespace);
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }
    res.status(200).send(step1);
}


module.exports = {postNamespaceInSecurityGroup};