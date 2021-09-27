const getAllNamespaces = async function(req, res){
    const id = req.params.org_id;
    if (!id) {
        res.status(400).send({
            "error": "missing organization id in request params"
        });
    }

    const response = await this.dbconn.getAllNamespaces(id);
    if (response.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }
    res.status(200).send(response);
};

const postNamespace = async function(req, res) {
    const org_id = req.body.org_id;
    const name = req.body.name;

    if (!org_id || !name) {
        res.status(400).send({
            "error": "missing organization id or name in request body"
        });
    }

    const response = await this.dbconn.postNamespace(org_id, name);
    if (response.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }
    res.status(200).send(response);
};

const deleteNamespace = async function(req, res) {
    const name = req.params.name;
    if (!name) {
        res.status(400).send({
            "error": "missing name in request params"
        });
    }

    const response = await this.dbconn.deleteNamespace(name);
    if (response.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }
    res.status(200).send(response);
};

module.exports = {getAllNamespaces, postNamespace, deleteNamespace};