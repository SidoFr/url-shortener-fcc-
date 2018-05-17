const mongoose = require('mongoose');

urlSchema = new mongoose.Schema({
    url : { type: String },
    url_short: { type : String },
    short: { type: String },
});

module.exports = mongoose.model('Url', urlSchema);
