const bodyParser     = require('body-parser'),
      express        = require('express'),
      mongoose       = require('mongoose'),
      http           = require('http'),
      morgan         = require('morgan'),
      twitter        = require('ntwitter'),
      config         = require('./config'),
      streamHandler  = require('./utils/streamHandler.js');


let app              = express();
let port             = process.env.EXPRESS_PORT || 8050;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/***************Mongodb configuratrion********************/
const configDB = require('./config/database.js');

mongoose.connect(configDB.url); // connect to our database
mongoose.Promise = global.Promise;

//set up our express application
app.use(morgan(process.env.environment)); // log every request to the console

// routes ====================================================================
require('./config/routes.js')(app); // load our routes and pass in our app and fully configured passport

//launch ======================================================================

// Fire it up (start our server)
const server = http.createServer(app).listen(port, function() {
  console.log('Magic is happening on port ' + port +'!!');
});

// Initialize socket.io
const io = require('socket.io').listen(server);


const twit = new twitter(config.twitter);
// Set a stream listener for tweets matching tracking keywords
twit.stream('statuses/filter',{ track: '#rickshawboyz, #savetherainforest'}, function(stream){
   console.log('Starting to streaming twitter !!');
   streamHandler(stream, io);
});

//catch 404 and forward to error handler
app.use(function (req, res, next) {
   res.status(404).send('Tweet not found');
});

exports = module.exports = app;
