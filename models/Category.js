const mongoose = require('mongoose');

const Category = new mongoose.Schema({
  typeName: String,
  typeId: Number,
})

module.exports = mongoose.model('Category', Category);