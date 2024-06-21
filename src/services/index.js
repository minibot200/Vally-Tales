const getAllUsers = require('./getAllUsers');
const getUser = require('./getUser');
const register = require('./register');
const serveStatic = require('./serveStatic');
const loginRequired = require('./loginRequired');
const deleteUser = require('./deleteUser');
const userLogout = require('./userLogout');

module.exports = {
    getAllUsers,
    getUser,
    register,
    serveStatic,
    loginRequired,
    deleteUser,
    userLogout,
};