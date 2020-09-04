let express = require('express');
let mongoose = require('mongoose');
let bodyparser = require('body-parser');
let cors = require('cors');
let path = require('path');
let route = require('./routes/flightdata');
let axios = require('axios');
let app = express();

app.use(cors());
app.use(bodyparser.json());
app.use('/api', route);

// Create link to Angular build directory
let distDir = __dirname + "/dist/";
app.use(express.static(distDir));

let mLabDB = "mongodb+srv://aksantara:asusrampage6@aksantara-vskbl.mongodb.net/aksantara?retryWrites=true&w=majority";
let localDB = "mongodb://localhost:27017/aksantara";

try {
    // Lakukan koneksi ke database
    mongoose.connect(mLabDB, { useUnifiedTopology: true, useNewUrlParser: true});
} catch (error) {
    console.log(error);
}

// Callback function jika berhasil connect ke database
mongoose.connection.on('connected', () => {
    console.log('connected to Aksantara Database on port:');
});

// Callback function jika gagal connect ke database
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Fail to connect Aksantara Database: ' + err);
    }
});

let server = app.listen(process.env.PORT || 8080, function () {
    let port = server.address().port;
    console.log("App now running on port", port);
});