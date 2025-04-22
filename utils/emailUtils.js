const Imap = require('imap-simple');
const { email } = require('../utils/constants');

async function getEmailVerificationCode() {
  const config = {
    imap: {
      user: email,
      password: 'kceimbxuncrvbxcn',
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      tlsOptions: {
        rejectUnauthorized: false
      },
      connectionTimeout: 15000,
    }
  };
  let verificationCode = '';
  let connection;
  try {
    connection = await Imap.connect(config);
    await connection.openBox('INBOX');

    async function markEmailsForDeletion(criteria) {
      const fetchOptions = { bodies: ['HEADER'], markSeen: false };
      const messages = await connection.search(criteria, fetchOptions);
      for (const message of messages) {
        const uid = message.attributes.uid;
        await connection.addFlags(uid, ['\\Deleted']);
      }
    }
    await markEmailsForDeletion(['SEEN', ['FROM', 'RedBoxMe']]);

    await connection.openBox('INBOX');
    const searchCriteria = ['UNSEEN', ['OR', ['FROM', 'RedBoxMe'], ['FROM', 'RedBoxMe']]];
    const fetchOptions = { bodies: ['TEXT'], markSeen: true };
    const messages = await connection.search(searchCriteria, fetchOptions);
    const latestMessage = messages[0];

    if (latestMessage) {
      const parts = latestMessage.parts;
      const text = parts[0]?.body;
      const match = text.match(/\b\d{5}\b/);
      verificationCode = match ? match[0] : '';
    }
    await markEmailsForDeletion(['SEEN', ['FROM', 'RedBoxMe']]);
    await connection.openBox('INBOX');
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    try {
      if (connection) {
        await connection.end();
      }
    } catch (error) {
      console.error('Error closing connection:', error);
    }
  }
  return verificationCode;
}


module.exports = {
  getEmailVerificationCode
};