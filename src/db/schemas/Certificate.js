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

const CertificateSchema = new Schema({
  shortId,

  name: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    required: false,
  },
  issuingDate: {
    type: Date,
    required: false
  },
  expirationDate: { 
    type: Date,
    required: true
  },
  deletedAt : {
    type: Date,
    required: false
  }
}, {
  timestamps: true,
  versionKey: false,
  collection: 'Certificate',
});

module.exports = mongoose.model('Certificate', CertificateSchema);
