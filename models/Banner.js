const mongoose = require('mongoose');

const Banner = new mongoose.Schema({
  name: String,
  path: String,
})

module.exports = mongoose.model('Banner', Banner);