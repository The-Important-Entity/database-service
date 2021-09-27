

const getSecurityGroups = async function(req, res){
    const org_id = req.params.org_id;
    if (!org_id) {
        res.status(400).send({
            "error": "missing organization organization id in request params"
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

};

const updateSecurityGroup = async function(req, res){

};

const deleteSecurityGroup = async function(req, res){

};

module.exports = {getSecurityGroups, postSecurityGroup, updateSecurityGroup, deleteSecurityGroup};