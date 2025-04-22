const Constants = {
  
    email:  process.env.LOGIN_EMAIL || 'qa2@alfredus.co' ,
    password: process.env.LOGIN_PASSWORD || 'AlfredusQA#25',
    JIRA_EMAIL: process.env.JIRA_USER,
    JIRA_API_TOKEN: process.env.JIRA_TOKEN,
    JIRA_HOST: 'https://alfredus-redboxme.atlassian.net',
    CLIENT_ID: '7672A9933EC349EA9A66ADE8988C6BD4',
    CLIENT_SECRET: 'd890fb6e3d9717058ba7f880a4a8b13c05e942eb045e8c2caa712c95fad5e397'

};

module.exports = Constants;