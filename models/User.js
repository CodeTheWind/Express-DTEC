const mongoose = require('mongoose');
const localDate = require('../utils/getCurrentDate');

const User = new mongoose.Schema({
  // 手机号、密码、ids、用户名、性别、个性签名、职业、公司、用户创建时间
  tel: String,
  password: String,

  ids: {
    type: String,
    default: "user_" + Math.random().toString(36).substr(2),
  },

  username: {
    type: String,
    default: "dtec_" + Math.random().toString(36).substr(2),
  },

  avatar: {
    type: String,
    default: 'http://127.0.0.1:8000/avatar/default.png',
  },

  sex: {
    type: String,
    default: '保密',
  },

  motto: {
    type: String,
    default: '',
  },

  profession: {
    type: String,
    default: '',
  },

  company: {
    type: String,
    default: '',
  },

  admin: {
    type: Boolean,
    default: false
  },

  createdDate: {
    type: String,
    default: localDate.localDate(),
  }
});

module.exports = mongoose.model('User', User);
