let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlightDataSchema = new Schema({
    // _id: String,
    time_boot_ms: Number,
    pitch: Number,
    roll: Number,
    yaw: Number,
    rollspeed: Number,
    pitchspeed: Number,
    yawspeed: Number,
    airspeed: Number,
    groundspeed: Number,
    heading: Number,
    throtlle: Number,
    alt: Number,
    climb: Number,
    // __v: Number
});

const FlightData = module.exports = mongoose.model("Flight_Data", FlightDataSchema);