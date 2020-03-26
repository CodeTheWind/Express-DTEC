const express = require('express');
const User = require('../models/User');
const router = express.Router();

/**
 * 返回数据统一格式
 */
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

  User.findOne({ tel }).then(res => {

    if (res) {
      data.msg = '用户已存在!';
      data.state = 1;
      return;
    } else {
      // 创建一个新用户
      const newUser = new User({ password, tel });

      data.msg = '注册成功！';
      return newUser.save();
    }

  }).then(() => {
    res.json(data);
  }).catch(error => {
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
      res.cookie('userIds', user.ids, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
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
router.get('/personaldata', async (req, res) => {
  if (req.cookies.userIds) {
    User.findOne({ ids: req.cookies.userIds }).then(res => {
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
router.get('/data', async (req, res) => {
  const ids = req.query.ids;
  const userIds = req.cookies.userIds || '';

  User.findOne({ ids }).then(res => {
    if (!res) {
      data.msg = '用户不存在';
      data.state = 404;
      return;
    } else {
      data.msg = res.username;
      data.data = res;

      if (ids === userIds) {
        data.owner = true;
      } else {
        data.owner = false;
        data.data.password = undefined;
      }

    }
  }).then(() => {
    res.json(data);
  })
})

/**
 * 修改个人资料
 */
router.post('/edit/profile', async (req, res) => {
  const userIds = req.cookies.userIds;
  const username = req.body.username;
  const profession = req.body.profession;
  const company = req.body.company;
  const motto = req.body.motto;

  if (userIds) {
    User.updateOne({ ids: userIds }, {
      username, profession, company, motto
    }).then(res => {
      if (res) {
        data.msg = '修改成功';
      } else {
        data.msg = '修改失败';
        data.state = 1;
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

/**
 * 修改用户头像
 */
router.post('/edit/avatar', async (req, res) => {
  const userIds = req.cookies.userIds;
  const avatar = req.body.avatar;

  if (userIds) {
    User.updateOne({ ids: userIds }, { avatar }).then(res => {
      if (res) {
        data.msg = '修改成功';
        data.state = 200;
      } else {
        data.msg = '修改失败';
        data.state = 202;
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

/**
 * 修改密码
 */
router.post('/edit/password', async (req, res) => {
  const userIds = req.cookies.userIds;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  if (userIds) {
    User.findOne({ ids: userIds }).then(res => {
      if (res.password !== oldPassword) {
        data.msg = '密码错误！';
        data.state = 202;
      } else {
        res.password = newPassword;
        res.save();
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
