let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WaypointSchema = new Schema({
    latitude: Number,
    longitude: Number
});


const WaypointParentSchema = new Schema({
    children: [WaypointSchema],
    child: WaypointSchema
});

const Waypoint = module.exports = mongoose.model('Waypoint', WaypointParentSchema);