const loginRequired = require('./loginRequired');
const imageUploader = require('./imageUploader');
const loggedInRedirect = require('./loggedInRedirect');
const {
    validateRegister,
    validateUser,
    validateEducation,
    validateAward,
    validateCertificate,
    validateProject,
    validateEmail,
    validatePassword,
} = require('./validator');

module.exports = {
    loginRequired,
    imageUploader,
    loggedInRedirect,

    validateRegister,
    validateUser,
    validateEducation,
    validateAward,
    validateCertificate,
    validateProject,
    validateEmail,
    validatePassword,
};