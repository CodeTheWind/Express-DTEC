const mongoose = require('mongoose');

const Category = new mongoose.Schema({
  typeName: String,
  typeId: String,
  createdDate: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
})

module.exports = mongoose.model('Category', Category);