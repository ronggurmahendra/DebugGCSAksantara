let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const btnStatus = mongoose.Schema({
    getParamBtn: Boolean,
    sendParamBtn: Boolean
});

const btnParamStatus = module.exports = mongoose.model('btnStatus', btnStatus);