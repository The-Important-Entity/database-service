
const getOrganization = async function(req, res){
    if (!req.params.name) {
        res.status(400).send({
            "error": "missing name in request body"
        });
        return;
    }
    const response = await this.dbconn.getOrganization(req.body.name);
    res.status(200).send(response);
};

const postOrganization = async function(req, res) {
    if (!req.body.name || !req.body.beta_key) {
        res.status(400).send({
            "error": "missing name or beta key in request body"
        });
        return;
    }
    if (req.body.beta_key != "TechSolutions2021") {
        res.status(400).send({
            "error": "incorrect beta key"
        });
    }
    const response = await this.dbconn.postOrganization(req.body.name);
    if (response.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }
    res.status(200).send(response);
};

const deleteOrganization = async function(req, res) {
    if (!req.params.name) {
        res.status(400).send({
            "error": "missing name in request body"
        });
        return;
    }

    const response = await this.dbconn.deleteOrganization(req.params.name);
    if (response.code) {
        res.status(500).send(this.processErrorCode(response.code));
        return;
    }
    res.status(200).send(response);
};

module.exports = {getOrganization, postOrganization, deleteOrganization};