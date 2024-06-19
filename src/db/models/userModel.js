const mongoose = require('mongoose');

const userSchema = require('../schemas/userSchema');

exports.userModel = mongoose.model('User', userSchema);