const express = require('express');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');
const router = express.Router();

// Home Route
router.get('/', ensureGuest, (req, res) => {
  res.render('index/welcome');
});

// Dashboard Route
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('index/dashboard');
});

module.exports = router;