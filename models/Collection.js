const mongoose = require('mongoose');

const Collection = new mongoose.Schema({
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

module.exports = mongoose.model('Collection', Collection);