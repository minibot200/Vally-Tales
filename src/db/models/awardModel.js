const { model } = require('mongoose');
const awardSchema = require('../schema/Award');
const AwardModel = model('Award', awardSchema);

module.exports = AwardModel;
