const express = require('express');
const router = express.Router();

const FlightData = require('../models/flightrecord');
const Waypoint = require("../models/waypoint");
const Parameter = require("../models/parameter");
const btnParamStatus = require("../models/btnParam");

// ----------------- WITHOUT DATABASE ----------------- //
let data = {
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
};

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
    data = req.body;
    res.json({ success: "Success" });
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
    //console.log("get request for mission");
    /*
    Waypoint.find((err, waypoints) => {
        console.log("sending mission")
        res.json(waypoints);
    });*/
    Waypoint.find({})
    .exec(function(err, waypoints){
        if(err){
            console.log("error sending mission")
        }else {
            res.json(waypoints)
        }
    })
    // Waypoint.watch()
    //     .on('change', waypoints => {
    //         // let len = waypoints.length - 1;
    //         // res.json(waypoints[len]);

    //         res.json(waypoints);
    //     });
});

let paramId = {};
/* BUAT PARAMETER */
router.post("/parameter", (req, res, next) => {
    let parameter = new Parameter({ children: req.body });

    parameter.save((err) => {
        if (err) {
            res.json({msg: 'Failed to added parameter ', err: err});
        } else {
            res.json({msg: 'Successfully added parameter'});
        }
    });

    paramId = parameter._id;
});

router.get("/parameters", (req, res, next) => {
    Parameter.findById(paramId, (err, parameter) => {
        if(err){
            console.log("Error getting parameters from server");
        }else {
            res.json(parameter);
        }
    });
});
/* BUAT PARAMETER */

/* BUAT statusBtnParameter */
let getParamBtn = false;
let sendParamBtn = false;

router.post("/btnparam", (req, res, next) => {
    getParamBtn = req.body.getParamBtn;
    sendParamBtn = req.body.sendParamBtn;
    res.json({ success: `Success to change state getParamBtn to: ${getParamBtn} and sendParamBtn to : ${sendParamBtn}` });
});

router.get("/btnparams", (req, res, next) => {
    res.json({ getParamBtn: getParamBtn, sendParamBtn: sendParamBtn });
});
/* BUAT statusBtnParameter */

module.exports = router;