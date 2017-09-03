'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
  id_user: [{type: Schema.ObjectId, ref: 'user'}],
  task: {type: String, required: true},
  status: {type: String, required: true, default: 'undone'},
  created_at: {type: Date, default: new Date()},
  updated_at: {type: Date, default: new Date()}
})

var Tasks = mongoose.model('task', taskSchema);

module.exports = Tasks
