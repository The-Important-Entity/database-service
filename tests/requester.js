
class Requester {
    constructor(){
        this.axios = require("axios");
    }

    async get(url) {
        try {
            const res = await this.axios.get(url);
            return res.data;
        }
        catch(res) {
            return res.response.data;
        }
    }

    async post(url, data) {
        try {
            const res = await this.axios.post(url, data);
            return res.data;
        }
        catch(res) {
            return res.response.data;
        }
    }

    async put(url, data) {
        try {
            const res = await this.axios.put(url, data);
            return res.data;
        }
        catch(res) {
            return res.response.data;
        }
    }

    async delete(url) {
        try {
            const res = await this.axios.delete(url);
            return res.data;
        }
        catch(res) {
            return res.response.data;
        }
    }
}

module.exports = Requester;