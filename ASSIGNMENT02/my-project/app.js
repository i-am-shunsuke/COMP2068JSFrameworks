// Core modules and third-party libraries
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var githubStrategy = require("passport-github2").Strategy;
var hbs = require("hbs");
var mongoose = require('mongoose');

// Custom configuration and models
var config = require("./config/global");
const User = require('./models/user');

// Routers
var indexRouter = require('./routes/index');
var projectsRouter = require("./routes/projects");

// Initialize express app
var app = express();

// MongoDB connection
mongoose.connect(config.ConnectionStrings.MongoDB)
  .then(() => console.log('MongoDB connected!!'))
  .catch(err => console.error(err));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'ggs', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(User.createStrategy());
passport.use(new githubStrategy({
  clientID: config.Authentication.GitHub.ClientId,
  clientSecret: config.Authentication.GitHub.ClientSecret,
  callbackURL: config.Authentication.GitHub.CallbackURL
},
async (accessToken, refreshToken, profile, done) => {
  const user = await User.findOne({ oauthId: profile.id });
  if (user) {
    return done(null, user);
  } else {
    const newUser = new User({
      username: profile.username,
      oauthId: profile.id,
      oauthProvider: "GitHub",
      created: Date.now()
    });
    const savedUser = await newUser.save();
    return done(null, savedUser);
  }
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// HBS Helper Methods
hbs.registerHelper("createOptionElement", (currentValue, selectedValue) => {
  var selectedProperty = (currentValue == selectedValue.toString()) ? "selected" : "";
  return new hbs.SafeString(`<option ${selectedProperty}>${currentValue}</option>`);
});

hbs.registerHelper('toShortDate', (longDateValue) => {
  return new hbs.SafeString(longDateValue.toLocaleDateString('en-CA'));
});

// Routing
app.use('/', indexRouter);
app.use('/projects', projectsRouter);
// app.use('/private', privateRouter); // Uncomment when needed

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Export app
module.exports = app;
