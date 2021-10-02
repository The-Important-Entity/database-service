const getAccessKey = async function(req, res) {
    const group_id = req.query.group_id;
    const org_id = req.query.org_id;
    const app_id = req.query.app_id;
    

    if (group_id) {
        const response = await this.dbconn.getAccessKeys(group_id);
        if (response.code) {
            res.status(500).send(this.processErrorCode(response.code));
            return;
        }
        res.status(200).send(response);
    }
    else if (org_id) {
        const response = await this.dbconn.getAccessKeysWithOrg(org_id);
        if (response.code) {
            res.status(500).send(this.processErrorCode(response.code));
            return;
        }
        res.status(200).send(response);
    }
    else if (app_id) {
        const response = await this.dbconn.getAppId(app_id);
        if (response.code) {
            res.status(500).send(this.processErrorCode(response.code));
            return;
        }
        res.status(200).send(response);
    }
    else {
        res.status(400).send({
            "error": "missing request query"
        });
    }
};

const getSecret = async function(req, res) {
    const app_id = req.body.app_id;
    const namespace = req.body.namespace;

    if (!app_id) {
        res.status(400).send({
            "error": "missing app_id in request body"
        });
        return;
    }

    if (!namespace) {
        const response = await this.dbconn.getSecretWithoutNamespace(app_id);
        if (response.code) {
            res.status(500).send(this.processErrorCode(response.code));
            return;
        }
        res.status(200).send(response);
    }
    else {
        const response = await this.dbconn.getSecret(app_id, namespace);
        if (response.code) {
            res.status(500).send(this.processErrorCode(response.code));
            return;
        }
        res.status(200).send(response);
    }

};

const getAccessKeys = async function(req, res) {
    const group_id = req.params.group_id;
    if (!group_id) {
        res.status(400).send({
            "error": "missing group id in request body"
        });
        return;
    }

    const response = await this.dbconn.getAccessKeys(group_id);
    if (response.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }
    res.status(200).send(response);
};

const getAppId = async function(req, res) {
    const app_id = req.params.app_id;
    if (!app_id) {
        res.status(400).send({
            "error": "missing app id in request body"
        });
        return;
    }

    const response = await this.dbconn.getAppId(app_id);
    if (response.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }
    res.status(200).send(response);
}

const postAccessKey = async function(req, res) {
    const group_id = req.body.group_id;
    const app_id = req.body.app_id;
    const secret = req.body.secret;

    if (!group_id || !app_id || !secret) {
        res.status(400).send({
            "error": "missing access key data in request body"
        });
        return;
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
        return;
    }

    const response = await this.dbconn.deleteAccessKey(app_id);
    if (response.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }
    res.status(200).send(response);
};



module.exports = {getAccessKey, getSecret, postAccessKey, deleteAccessKey};