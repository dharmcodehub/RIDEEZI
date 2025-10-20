const mongoose = require('mongoose');

// This is the TTL Schema (Time To Live ) for deleting the tokens means the document will be delete in 24 hours as  token will be expired  
const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours in seconds
    }
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);