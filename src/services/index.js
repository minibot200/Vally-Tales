const getAllUsers = require('./user/getAllUsers');
const getUser = require('./user/getUser');
const editUser = require('./user/editUser');
const deleteUser = require('./user/deleteUser');

const getAllEducations = require('./education/getAllEducations');
const addEducation = require('./education/addEducation');
const editEducation = require('./education/editEducation');
const deleteEducation = require('./education/deleteEducation');

const getAllAwards = require('./award/getAllAwards');
const addAward = require('./award/addAward');
const editAward = require('./award/editAward');
const deleteAward = require('./award/deleteAward');

const register = require('./register');
const serveStatic = require('./serveStatic');
const userLogout = require('./userLogout');

module.exports = {
    getAllUsers,
    getUser,
    editUser,
    getAllEducations,
    addEducation,
    editEducation,
    deleteEducation,
    getAllAwards,
    addAward,
    editAward,
    deleteAward,
    register,
    serveStatic,
    deleteUser,
    userLogout,
};