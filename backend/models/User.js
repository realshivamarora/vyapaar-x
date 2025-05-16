const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('LoginCredentials', UserSchema, 'UserData');
