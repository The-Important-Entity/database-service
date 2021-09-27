
const getSecurityPerms = async function(req, res){
    const group_id = req.params.group_id;
    if (!group_id) {
        res.status(400).send({
            "error": "missing group id in request params"
        });
        return;
    }

    const response = await this.dbconn.getSecurityPerms(group_id);
    if (response.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }
    res.status(200).send(response);
};

const postSecurityPerm = async function(req, res){
    const group_id = req.body.group_id;
    const namespace = req.body.namespace;
    const read_perm = req.body.read_perm;
    const write_perm = req.body.write_perm;

    if (!group_id || !namespace || !read_perm || !write_perm) {
        res.status(400).send({
            "error": "missing permissions data in request body"
        });
        return;
    }
    const response = await this.dbconn.postSecurityPerm(group_id, namespace, read_perm, write_perm);
    if (response.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }
    res.status(200).send(response);
};

const updateSecurityPerm = async function(req, res){
    const id = req.body.id;
    const namespace = req.body.namespace;
    const read_perm = req.body.read_perm;
    const write_perm = req.body.write_perm;

    if (!id || !namespace || !Number.isInteger(read_perm) || !Number.isInteger(write_perm)) {
        res.status(400).send({
            "error": "missing permissions data in request body"
        });
        return;
    }
    const response = await this.dbconn.updateSecurityPerm(id, namespace, read_perm, write_perm);
    if (response.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }
    res.status(200).send(response);
};

const deleteSecurityPerm = async function(req, res){
    const id = req.params.id;
    if (!id) {
        res.status(400).send({
            "error": "missing group id in request params"
        });
        return;
    }

    const response = await this.dbconn.deleteSecurityPerm(id);
    if (response.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }
    res.status(200).send(response);
};

module.exports = {getSecurityPerms, postSecurityPerm, updateSecurityPerm, deleteSecurityPerm};