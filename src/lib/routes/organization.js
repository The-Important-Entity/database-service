
const getOrganization = async function(req, res){
    const name = req.params.name;
    if (!name) {
        res.status(400).send({
            "error": "missing name in request params"
        });
        return;
    }
    const response = await this.dbconn.getOrganization(name);
    if (response.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }
    res.status(200).send(response);
};

const postOrganization = async function(req, res) {
    const name = req.body.name;
    const key = req.body.beta_key;
    if (!name || !key) {
        res.status(400).send({
            "error": "missing name or beta key in request body"
        });
        return;
    }
    if (key != "TechSolutions2021"){
        res.status(400).send({
            "error": "incorrect beta key"
        });
    }
    const response = await this.dbconn.postOrganization(name);
    if (response.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }
    res.status(200).send(response);
};

const deleteOrganization = async function(req, res) {
    const name = req.params.name;
    if (!name) {
        res.status(400).send({
            "error": "missing name in request body"
        });
        return;
    }

    const response = await this.dbconn.deleteOrganization(name);
    if (response.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }
    res.status(200).send(response);
};

module.exports = {getOrganization, postOrganization, deleteOrganization};