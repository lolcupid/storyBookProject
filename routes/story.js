const express = require('express');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');
const router = express.Router();

// Story Route
router.get('/', (req, res) => {
  res.render('story/home');
});

// Story Route
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('story/add');
});

// Story Route
router.get('/show', ensureAuthenticated, (req, res) => {
  res.render('story/show');
});

// Story Route
router.get('/edit', ensureAuthenticated, (req, res) => {
  res.render('story/edit');
});

module.exports = router;