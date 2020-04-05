const mongoose = require('mongoose');
const localDate = require('../utils/getCurrentDate');

const Article = new mongoose.Schema({
  title: String,
  des: String,
  content: String,
  userIds: String,
  typeId: Number,
  typeName: String,
  tag: String,
  comments: Array,

  views: {
    type: Number,
    default: 0,
  },

  likes: {
    type: Number,
    default: 0,
  },

  date: {
    type: String,
    default: localDate.localDate(),
  }
});

module.exports = mongoose.model('Article', Article);
