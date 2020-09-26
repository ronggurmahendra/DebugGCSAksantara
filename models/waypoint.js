let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WaypointSchema = new Schema({
    command: Number,
    param1: Number,
    param2: Number,
    param3: Number,
    param4: Number,
    x: Number,
    y: Number,
    z: Number,
    target_system: Number,
    target_component: Number,
    //'seq': seq, 
    frame: Number,
    mission_type: Number,
    current: Number,
    autocontinue: Number
});


const WaypointParentSchema = new Schema({
    children: [WaypointSchema],
    child: WaypointSchema
});

const Waypoint = module.exports = mongoose.model('Waypoint', WaypointParentSchema);