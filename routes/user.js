const express = require('express');
const User = require('../models/User');
const Article = require('../models/Article');
const localDate = require('../utils/getCurrentDate');

const router = express.Router();

let data;

router.use((req, res, next) => {
  data = {
    msg: '',
    state: 0,
  }
  next();
})

/**
 * 用户注册
 */
router.post('/register', async (req, res) => {
  const password = req.body.password;
  const tel = req.body.tel;
  const username = "dtec_" + Math.random().toString(36).substr(2);
  const createdDate = localDate.localDate();

  User.findOne({ tel }).then(user => {

    if (user) {
      data.msg = '用户已存在!';
      data.state = 1;
      return;
    } else {
      // 创建一个新用户
      return new User({ password, tel, username, createdDate }).save();
    }
  }).then(user => {
    if (user) {
      data.msg = '注册成功！';
      res.json(data);
    }
  }).catch(error => {
    data.msg = '注册失败！';
    data.state = 202;
    res.json(data);
    console.log(error);
  });
})

/**
 * 用户登录
 */
router.post('/login', async (req, res) => {
  const tel = req.body.tel;
  const password = req.body.password;

  User.findOne({ tel }).then(res => {

    if (!res) {
      data.msg = "用户不存在，请先注册！"
      data.state = 1;
      return;
    } else {

      if (password !== res.password) {
        data.msg = '密码错误！';
        data.state = 2;
        return;
      } else {
        data.msg = '登录成功！';
        return res;
      }
    }
  }).then(user => {
    if (user) {
      res.cookie('userIds', user._id, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    }
    res.json(data);
  }).catch(error => {
    console.log(error);
  })
})

/**
 * 退出登录
 */
router.post('/logout', async (req, res) => {
  if (req.cookies.userIds) {
    data.msg = '退出成功！';
    res.clearCookie('userIds');
    res.json(data);
  } else {
    data.msg = '未登录';
    data.state = 302;
    res.json(data);
  }
})

/**
 * 获取当前登录人的资料
 */
router.get('/get/personaldata', async (req, res) => {
  if (req.cookies.userIds) {
    User.findOne({ _id: req.cookies.userIds }).then(res => {
      data.msg = res.username;
      data.data = res;
    }).then(() => {
      res.json(data);
    }).catch(error => {
      console.log(error);
    })
  } else {
    data.msg = '未登录';
    data.state = 302;
    res.json(data);
  }
})

/**
 * 获取用户资料
 */
router.get('/get/data', async (req, res) => {
  const ids = req.query.ids;
  const userIds = req.cookies.userIds;
  let likes = 0;
  let views = 0;

  User.findOne({ _id: ids }).then(user => {
    if (!user) {
      data.msg = '用户不存在';
      data.state = 404;
      return;
    } else {
      data.msg = '用户信息';
      data.state = 200;
      data.data = user;

      if (ids === userIds) {
        data.owner = true;
      } else {
        data.owner = false;
        data.data.password = undefined;
      }

      return Article.find({ author: ids });
    }
  }).then(articles => {
    if (articles) {
      articles.forEach(item => {
        views += item.views;
        likes += item.likes;
      });
      const newData = JSON.parse(JSON.stringify(data.data));
      newData.views = views;
      newData.likes = likes;

      data.data = newData;
    }
    res.json(data);
  }).catch(error => {
    data.msg = error;
    res.json(data);
  })
})

/**
 * 修改个人资料
 */
router.post('/update/data', async (req, res) => {
  const userIds = req.cookies.userIds;
  const username = req.body.username;
  const profession = req.body.profession;
  const company = req.body.company;
  const motto = req.body.motto;

  if (userIds) {
    User.updateOne({ _id: userIds }, {
      username, profession, company, motto
    }).then(user => {
      if (user) {
        data.msg = '修改成功';
      } else {
        data.msg = '修改失败';
        data.state = 1;
      }
      res.json(data);
    }).catch(error => {
      console.log(error);
    })
  } else {
    data.msg = '未登录';
    data.state = 302;
    res.json(data);
  }
})

/**
 * 修改用户头像
 */
router.post('/update/avatar', async (req, res) => {
  const userIds = req.cookies.userIds;
  const avatar = req.body.avatar;

  if (userIds) {
    User.updateOne({ _id: userIds }, { avatar }).then(user => {
      if (user) {
        data.msg = '修改成功';
        data.state = 200;
      } else {
        data.msg = '修改失败';
        data.state = 202;
      }
      res.json(data);
    }).catch(error => {
      console.log(error);
    })
  } else {
    data.msg = '未登录';
    data.state = 302;
    res.json(data);
  }
})

/**
 * 修改密码
 */
router.post('/update/password', async (req, res) => {
  const userIds = req.cookies.userIds;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  if (userIds) {
    User.findOne({ _id: userIds }).then(user => {
      if (user.password !== oldPassword) {
        data.msg = '密码错误！';
        data.state = 202;
      } else {
        user.password = newPassword;
        user.save();
        data.msg = '修改成功！';
      }
    }).then(() => {
      res.json(data);
    }).catch(error => {
      console.log(error);
    })
  } else {
    data.msg = '未登录';
    data.state = 302;
    res.json(data);
  }
})



module.exports = router;
