const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const models = require('../models/models');

const User = models.User;

passport.serializeUser( (user, done) => {
  done(null, user.id);
});

passport.deserializeUser( (id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});


