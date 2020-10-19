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
let newDB = "mongodb://aksantara:asusrampage6@aksantara-shard-00-00.vskbl.mongodb.net:27017,aksantara-shard-00-01.vskbl.mongodb.net:27017,aksantara-shard-00-02.vskbl.mongodb.net:27017/akromiafif?ssl=true&replicaSet=Aksantara-shard-0&authSource=admin&retryWrites=true&w=majority";

try {
    // Lakukan koneksi ke database
    mongoose.connect(newDB, { useUnifiedTopology: true, useNewUrlParser: true});
} catch (error) {
    console.log(error);
}

// Callback function jika berhasil connect ke database
mongoose.connection.on('connected', () => {
    console.log('connected to Aksantara Database');
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