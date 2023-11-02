const express = require('express');
const googleAuth = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const session = require('express-session');
require('dotenv').config();
const crypto = require('crypto');

const sessionSecret = crypto.randomBytes(20).toString('hex');

googleAuth.use(
  session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

googleAuth.use(passport.initialize());
googleAuth.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

googleAuth.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

googleAuth.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
 (req, res) => {
  const user = req.user;

  const token = jwt.sign(user, process.env.JWT_SECRET);
  const redirectUrl = `http://localhost:3000/success/${encodeURIComponent(token)}`;
  res.redirect(redirectUrl);
});

googleAuth.get('/success', (req, res) => {
  res.redirect('http://localhost:3000/home');
});

module.exports = googleAuth;
