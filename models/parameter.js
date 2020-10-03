let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParameterSchema = new Schema({
    param_value: Number,
    param_count: Number,
    param_index: Number,
    param_id: String,
    param_type: Number
});

const ParameterParentSchema = new Schema({
    children: [ParameterSchema],
    child: ParameterSchema
});

const btnStatus = mongoose.Schema({
    isClicked: Boolean
});

const Parameter = module.exports = mongoose.model('Parameter', ParameterParentSchema);

