const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// 만들어둔 나노id.js
const generateNanoId = require('../utils/nanoid');

// shortId 필드 정의
const shortId = {
  type: String,
  default: generateNanoId,
  required: true,
  unique: true,
};

const AwardSchema = new Schema({
  shortId,
  /*
  _awardId: {
    type: String,
    default: generateNanoId,
    unique: true
  },
  */ 
  title: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    required: false,
  },
  date: {
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
  collection: 'Award', // 컬렉션 이름 수정
});

module.exports = mongoose.model('Award', AwardSchema);
