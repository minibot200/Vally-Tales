const dotenv = require('dotenv');
dotenv.config();

if (process.env.mongodbUrl === "undefined") {
    throw new Error('There Is No MongoDB');
}

module.exports = {
    applicationName: 'Valley-Tales',
    mongodbUrl: process.env.mongodbUrl,
    port: process.env.port || 3000,
    secretKey: process.env.secretKey,
}