const mongoose = require('mongoose');

const Article = new mongoose.Schema({
  title: String,
  des: String,
  content: String,
  tags: Array,
  date: String,

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },

  views: {
    type: Number,
    default: 0,
  },

  likes: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model('Article', Article);
