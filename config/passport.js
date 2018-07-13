const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');
const User = require('../models/user');

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
  },
    function (accessToken, refreshToken, profile, done) {
      // console.log(accessToken);
      // console.log(profile);
      const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));

      const newUser = {
        googleID: profile.id,
        email: profile.emails[0].value,
        image: image,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName
      }

      User.findOne({ googleID: profile.id }, (err, user) => {
        if (user) {
          done(null, user);
        } else {
          User.create(newUser, (err, user) => {
            if(err) {
              console.log(err);
            } else {
              done(null, user);
            }
          })
        }
      })
    }
  ));
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => done(null, user));
  });
}