const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CertificateSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
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

module.exports = CertificateSchema;
