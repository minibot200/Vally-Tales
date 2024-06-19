const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('./types/shortId');
//만들어둔 나노id.js
const generateNanoId = require('../utils/nanoid');

//shortid 잘동작하는지 확인하고
//DB로 테스트 해보기

const ProjectSchema = new Schema({
  shortId,
  /* 
  _userId: {
    type: String,
    default: generateNanoId,
    required: true,
    unique: true,
  },
  */
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
  },
  startDate: {
    type: Date,
    required: false
  },
  endDate: { 
    type: Date,
    required: false
  },
  deletedAt : {
    type: Date,
    required: false
  }
}, {
  timestamps: true,
  versionKey: false,
  collection: 'Project',
});


module.exports = mongoose.model('Project', ProjectSchema);
