// server code:
var path = require('path');
const express = require('express');
const app = express();

// .env config
const dotenv = require('dotenv');
dotenv.config();

/* Middleware*/
const bodyParser = require('body-parser');

// API
const aylien = require("aylien_textapi");

const textAPI = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
const PORT = 8080 || process.env.port;

// set dist directory for static files.
app.use(express.static('dist'));

// listen to port
app.listen(PORT , function () {
    console.log('Server is listening on port 8080!')
});

// routes:
app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'));
});

app.get('/test', function (req, res) {
    res.send('test works fine');
});


app.post('/evaluate', function (req, res) {
    // API Request
    textAPI.sentiment({
        'text': req.body.textInput
    //    John is a very good football player!
    }, function(error, response) {
        if (error === null) {
            res.send({evaluationData: response});
        }
    });

});

