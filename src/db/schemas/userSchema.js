const { Schema } = require('mongoose');

const shortId = require('./types/shortId');

const userSchema = new Schema({
    shortId,
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    deletedAt: {
        type: Date,
    }
}, {
    timestamps: true,
    versionKey: false,
    collection: 'User',
});

module.exports = userSchema;