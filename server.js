const express = require('express'); //
const hbs = require('hbs'); //
const bodyParser = require('body-parser'); //
const db = require("./database/db.js");
const routes = require("./routes/routes.js");

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

require('dotenv').config();
PORT = process.env.PORT || 3000;
hostname = "localhost";

db.connect();



/******************Sessions*************/
const session = require('express-session'); //
const flash = require('connect-flash');  //
const MongoStore = require('connect-mongodb-session')(session); //
 
var url = 'mongodb://127.0.0.1:27017/APDEV-Project';
//"mongodb://localhost:27017";

app.use(session({
    secret: 'ccapdevmachineproject',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        uri: url,
        collection: "sessions"
     }),
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 }
  }));

//success and error message configuration
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
  });

app.use(express.static('public'));
app.use('/',routes);

app.listen(port, function() {
    console.log("Server is running at:");
//    console.log("http://" + hostname + ":" + port);
})