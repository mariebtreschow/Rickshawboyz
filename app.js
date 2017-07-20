const bodyParser     = require('body-parser'),
      express        = require('express'),
      morgan         = require('morgan');

let app              = express();
let port             = process.env.EXPRESS_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//set up our express application
app.use(morgan(process.env.environment)); // log every request to the console

// routes ====================================================================
require('./config/routes.js')(app); // load our routes and pass in our app and fully configured passport

//launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port + ' !!!!');

//catch 404 and forward to error handler
app.use(function (req, res, next) {
   res.status(404).send('Document not found');
});

exports = module.exports = app;
