'use strict'

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true },
  secret: {type: String, unique: true, required:true},
  email: {type: String, unique: true, required: true, lowercase: true}
})

var Users = mongoose.model('user', userSchema);

module.exports = Users
