const axios = require('axios');
const { CLIENT_ID, CLIENT_SECRET } = require("../Utils/constants");
async function authenticateXray() {
    const response = await axios.post('https://xray.cloud.getxray.app/api/v2/authenticate', {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
    });
    return response.data;
}

module.exports = authenticateXray;