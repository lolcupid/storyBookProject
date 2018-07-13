const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleID: String,
  email: String,
  image: String,
  firstName: String,
  lastName: String,
});

module.exports = mongoose.model('User', userSchema);