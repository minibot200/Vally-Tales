const { model } = require('mongoose');
const certificateSchema = require('../schema/Certificate');
const CertificateModel = model('Certificate', certificateSchema);

module.exports = CertificateModel;
