

const getSecurityGroups = async function(req, res){
    const org_id = req.params.org_id;
    if (!org_id) {
        res.status(400).send({
            "error": "missing organization id in request params"
        });
    }

    const response = await this.dbconn.getAllSecurityGroups(org_id);
    if (response.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }
    res.status(200).send(response);
};

const postSecurityGroup = async function(req, res){
    const org_id = req.body.org_id;
    const alias = req.body.alias;

    if (!org_id || !alias) {
        res.status(400).send({
            "error": "missing organization id or alias in request body"
        });
    }

    const response = await this.dbconn.postSecurityGroup(org_id, alias);
    if (response.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }
    res.status(200).send(response);
};

const updateSecurityGroup = async function(req, res){
    const group_id = req.body.group_id;
    const alias = req.body.alias;

    if (!group_id || !alias) {
        res.status(400).send({
            "error": "missing security group id or alias in request body"
        });
    }

    const response = await this.dbconn.updateSecurityGroup(group_id, alias);
    if (response.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }
    res.status(200).send(response);
};

const deleteSecurityGroup = async function(req, res){
    const id = req.params.id;
    if (!id) {
        res.status(400).send({
            "error": "missing security group id in request params"
        });
    }

    const response = await this.dbconn.deleteSecurityGroup(id);
    if (response.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }
    res.status(200).send(response);
};

module.exports = {getSecurityGroups, postSecurityGroup, updateSecurityGroup, deleteSecurityGroup};