

const getSecret = async function(req, res) {
    const app_id = req.body.app_id;
    const namespace = req.body.namespace;

    if (!app_id || !namespace) {
        res.status(400).send({
            "error": "missing app_id or namespace in request body"
        });
    }
    const response = await this.dbconn.getSecret(app_id, namespace);
    if (response.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }
    res.status(200).send(response);
};

const getAccessKeys = async function(req, res) {
    const group_id = req.params.group_id;
    if (!group_id) {
        res.status(400).send({
            "error": "missing group id in request body"
        });
    }

    const response = await this.dbconn.getAccessKeys(group_id);
    if (response.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }
    res.status(200).send(response);
};

const postAccessKey = async function(req, res) {
    const group_id = req.body.group_id;
    const app_id = req.body.app_id;
    const secret = req.body.secret;

    if (!group_id || !app_id || !secret) {
        res.status(400).send({
            "error": "missing access key data in request body"
        });
    }

    const response = await this.dbconn.postAccessKey(group_id, app_id, secret);
    if (response.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }
    res.status(200).send(response);
};

const deleteAccessKey = async function(req, res) {
    const app_id = req.params.app_id;
    if (!app_id) {
        res.status(400).send({
            "error": "missing app id in request params"
        });
    }

    const response = await this.dbconn.deleteAccessKey(app_id);
    if (response.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }
    res.status(200).send(response);
};



module.exports = {getSecret, getAccessKeys, postAccessKey, deleteAccessKey};