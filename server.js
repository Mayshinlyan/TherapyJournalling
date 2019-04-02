// Import Middleware
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const flash = require('connect-flash')
const path = require('path');
const keys = require('./config/keys.js');


// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, () => {
  console.log('Connected to MongoDB.');
}, {useNewUrlParser: true});
require('./models/User.js');

// Import router.js
const router = require('./routes/router');
const app = express();

// Passport for authentication
const passport = require('passport');
require('./config/passport.js');

// Express only serves static assets in production
//app.use(express.static('./public'));
app.use('/', express.static(path.join(__dirname + 'public')));
// Use Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

  /*  Passport.js   */
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys:['fdfvfgnhrfb']
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// Use routes
app.use('/api', router);



// Serve static files if in production
if(process.env.NODE_ENV === 'production'){
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});


