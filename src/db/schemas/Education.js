const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// 만들어둔 나노id.js
const generateNanoId = require('../utils/nanoid');

const EducationSchema = new Schema({
  shortId: {
    type: String,
    default: generateNanoId,
    required: true,
    unique: true,
  },
  /*
  _eduId: {
    type: String,
    default: generateNanoId, // 오타수정
    required: true,
    unique: true,
  },
  */
  school: {
    type: String,
    required: false
  },
  degree: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
    required: false
  },
  endDate: {
    type: Date,
    required: false
  },
  deletedAt: {
    type: Date,
    required: false
  }
}, {
  timestamps: true,
  versionKey: false,
  collection: 'Education',
});

module.exports = mongoose.model('Education', EducationSchema);
