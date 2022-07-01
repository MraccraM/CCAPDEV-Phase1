const dotenv = require('dotenv');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const db = require("./database/db.js");
const routes = require("./routes/routes.js");

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

dotenv.config();
port = 3000;
hostname = "localhost";

db.connect();

app.use(express.static('public'));
app.use('/',routes);



app.listen(port, hostname, function() {
    console.log("Server is running at:");
    console.log("http://" + hostname + ":" + port);
})