const fs = require('fs');
const axios = require('axios');
const XRAY_CLOUD_HOST = 'https://xray.cloud.getxray.app/api/v2/import/execution/junit';
async function uploadTestResults(token, filePath, testExecKey) {
    if (!fs.existsSync(filePath)) {
        console.error(`File does not exist at ${filePath}`);
        return;
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    try {
        const response = await axios.post(
            `${XRAY_CLOUD_HOST}?testExecKey=${testExecKey}`,
            fileContent, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/xml', 
                },
            }
        );
        console.log('Test results uploaded successfully:', response.data);
    } catch (error) {
        console.error('Error uploading test results to Xray:');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
            console.error('Headers:', error.response.headers);
        } else {
            console.error('Error message:', error.message);
        }
    }
}
module.exports = uploadTestResults;