const mongoose = require('mongoose');

const Article = new mongoose.Schema({
  title: String,
  des: String,
  content: String,
  userIds: String,
  typeId: Number,
  typeName: String,
  tag: String,

  ids: {
    type: String,
    default: "article_" + Math.random().toString(36).substr(2),
  },

  views: {
    type: Number,
    default: 0,
  },
  
  likes: {
    type: Number,
    default: 0,
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Article', Article);
