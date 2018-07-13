const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
var exphbs  = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;

// Passport Config
require('./config/passport')(passport);

// Keys Config
const keys = require('./config/keys');

// Map Global Promise
mongoose.Promise = global.Promise;

// Connecting MongoDB
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true
}).then(() => console.log('MongoDB connected!!!'))
  .catch(err => console.log(err));

// Public Static
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Loading Routes
const homeRoute = require('./routes/home');
const authRoute = require('./routes/auth');
const storyRoute = require('./routes/story');

app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}))

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


// Global variables
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Home Route
app.use('/', homeRoute);
// Auth Route
app.use('/auth', authRoute);
// Story Route
app.use('/story', storyRoute);


// Starting Server
app.listen(port, () => {
  console.log(`Server is running at port${port}`);
})

