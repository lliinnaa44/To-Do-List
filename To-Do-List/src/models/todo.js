const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    todo: {
    type: String,
    required: true
  },
  check: {
    type: Boolean,
    required: true
  },
  username: {
    type: String,
    required: true,
  }
});

const Todo = mongoose.model('todo', todoSchema);

module.exports = Todo;