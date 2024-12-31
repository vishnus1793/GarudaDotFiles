// models/pnrModel.js
const mongoose = require('mongoose');

const PNRSchema = new mongoose.Schema({
    pnrNumber: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const PNR = mongoose.model('PNR', PNRSchema);
module.exports = PNR;
