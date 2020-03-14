const mongoose = require('mongoose');

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

  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', User);
