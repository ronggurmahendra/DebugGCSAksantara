const express = require('express');
const router = express.Router();

const FlightData = require('../models/flightrecord');
const Waypoint = require("../models/waypoint");

// ----------------- WITHOUT DATABASE ----------------- //
let data = [{
    time_boot_ms: 0,
    pitch: 0,
    roll: 0,
    yaw: 0,
    rollspeed: 0,
    pitchspeed: 0,
    yawspeed: 0,
    airspeed: 0,
    groundspeed: 0,
    heading: 0,
    throtlle: 0,
    alt: 0,
    climb: 0
}];

let defaultLen = data.length;
// ----------------- WITHOUT DATABASE ----------------- //

router.get('/flightdatas', (req, res, next) => {
    // -----------------  DATABASE ON  ----------------- //
    // FlightData.find((err, flightdatas) => {
    //     res.json(flightdatas);
    // });
    // -----------------  DATABASE ON  ----------------- //

    // ----------------- WITHOUT DATABASE ----------------- //
    res.json(data);
    // ----------------- WITHOUT DATABASE ----------------- //
});

router.post('/flightdata', (req, res, next) => {
    // ----------------- WITHOUT DATABASE ----------------- //
    data.pop();
    data.push({
        time_boot_ms: req.body.time_boot_ms,
        pitch: req.body.pitch,
        roll: req.body.roll,
        yaw: req.body.yaw,
        rollspeed: req.body.rollspeed,
        pitchspeed: req.body.pitchspeed,
        yawspeed: req.body.yawspeed,
        airspeed: req.body.airspeed,
        groundspeed: req.body.groundspeed,
        heading: req.body.heading,
        throtlle: req.body.throtlle,
        alt: req.body.alt,
        climb: req.body.climb
    });

    let afterLen = data.length;

    if (afterLen > defaultLen) {
        res.json({msg: "Successfully added flightrecord"});
    } else {
        res.json({msg: "Failed to add flightrecord"});
    }
     // ----------------- WITHOUT DATABASE ----------------- //

    // -----------------  DATABASE ON  ----------------- //
    // let flightData = new FlightData({
    //     time_boot_ms: req.body.time_boot_ms,
    //     pitch: req.body.pitch,
    //     roll: req.body.roll,
    //     yaw: req.body.yaw,
    //     rollspeed: req.body.rollspeed,
    //     pitchspeed: req.body.pitchspeed,
    //     yawspeed: req.body.yawspeed,
    //     airspeed: req.body.airspeed,
    //     groundspeed: req.body.groundspeed,
    //     heading: req.body.heading,
    //     throtlle: req.body.throtlle,
    //     alt: req.body.alt,
    //     climb: req.body.climb
    // });

    // flightData.save((err, flightdatas) => {
    //     if (err) {
    //         res.json({msg: 'Failed to added flightrecord', err: err});
    //     } else {
    //         res.json({msg: 'Successfully added flightrecord'});
    //     }
    // });
    // -----------------  DATABASE ON  ----------------- //
});

/* BUAT WAYPOINT */
router.post("/waypoint", (req, res, next) => {
    let waypoint = new Waypoint({ children: req.body });

    waypoint.save((err) => {
        if (err) {
            res.json({msg: 'Failed to added waypoint', err: err});
        } else {
            res.json({msg: 'Successfully added waypoint'});
        }
    });
});

router.get("/waypoints", (req, res, next) => {
    Waypoint.find((err, waypoints) => {
        let len = waypoints.length - 1;
        res.json(waypoints[len]);
    });

    // Waypoint.watch()
    //     .on('change', waypoints => {
    //         // let len = waypoints.length - 1;
    //         // res.json(waypoints[len]);

    //         res.json(waypoints);
    //     });
});

module.exports = router;