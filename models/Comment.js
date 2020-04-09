const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
  content: String,
  date: String,

  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
  },
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

module.exports = mongoose.model('Comment', Comment);