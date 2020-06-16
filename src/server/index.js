// server code:
var path = require('path');
const express = require('express');
const app = express();

app.use(express.static('dist'));


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


const PORT = 8080 || process.env.port;


console.log(__dirname);


app.listen(PORT , function () {
    console.log('Server is listening on port 8080!')
});


// routes:
app.get('/', function (req, res) {
    res.sendFile(path.resolve('src/client/views/index.html'));
});