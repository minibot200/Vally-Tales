const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
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


module.exports = ProjectSchema;
