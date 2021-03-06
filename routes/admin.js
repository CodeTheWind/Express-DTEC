const express = require('express');
const Article = require('../models/Article');
const Category = require('../models/Category');
const User = require('../models/User');
const Banner = require('../models/Banner');
const deleteObject = require('../utils/deleteObject');
const localDate = require('../utils/getCurrentDate');

const router = express.Router();

let data;

router.use((req, res, next) => {
  data = {
    msg: '',
    state: 0,
  }

  const userIds = req.cookies.userIds;

  if (userIds) {
    User.findOne({ _id: userIds }).then(user => {

      if (user.admin) {
        next();
      } else {
        data.msg = '您不是管理员，无权操作！';
        data.state = 302;
        res.json(data);
      }
    }).catch(error => {
      console.log(error);
    })

  } else {
    data.msg = '未登录';
    data.state = 302;
    res.json(data);
  }
});

/**
 * 获取用户列表
 */
router.get('/get/userlist', async (req, res) => {
  const keyword = req.query.keyword || '';
  const count = Number(req.query.count) || 10;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * count;

  User.find().countDocuments()
    .then(count => {
      data.total = count;

      return User.find({
        $or: [
          { username: { $regex: keyword } },
          { tel: { $regex: keyword } }
        ]
      }, {
        password: 0
      }).limit(count).skip(skip).sort({
        _id: -1
      });
    })
    .then(users => {
      data.msg = '用户列表';
      data.state = 200;
      data.data = users;

      res.json(data);
    })
    .catch(error => console.log(error));
})

/**
 * 添加分类
 */
router.post('/add/category', async (req, res) => {
  const userIds = req.cookies.userIds || '';
  const typeId = req.body.typeId || '';
  const typeName = req.body.typeName || '';


  Category.find().then(category => {
    // 判断分类是否存在
    if (category.some(item => item.typeId === typeId || item.typeName === typeName)) {
      return;
    } else {
      return new Category({
        typeId,
        typeName,
        createdDate: localDate.localDate(),
        creator: userIds,
      }).save();
    }
  }).then(category => {
    if (category) {
      data.msg = '添加成功';
      data.state = 200;
    } else {
      data.msg = '分类ID或者分类名称重复！';
      data.state = 202;
    }
    res.json(data);
  }).catch(error => {
    console.log(error);
  })

})

/**
 * 删除对象
 */
router.post('/delete/:objectname', async (req, res) => {
  // 动态路由参数
  const objectName = req.params.objectname;
  const ids = req.body.ids;

  switch (objectName) {
    case 'user':
      deleteObject.deleteObject(User, ids, data).then(data => {
        res.json(data);
      });
      break;
    case 'article':
      deleteObject.deleteObject(Article, ids, data).then(data => {
        res.json(data);
      });
      break;
    case 'category':
      deleteObject.deleteObject(Category, ids, data).then(data => {
        res.json(data);
      });
      break;
    case 'banner':
      deleteObject.deleteObject(Banner, ids, data).then(data => {
        res.json(data);
      });
      break;
    default:
      data.msg = '没有该对象！';
      data.state = 404;
      res.json(data);
  }
})

/**
 * 上传banner图
 */
router.post('/add/banner', (req, res) => {
  const name = req.body.name;
  const path = req.body.path;

  new Banner({ name, path }).save().then(banner => {
    if (banner) {
      data.msg = '上传成功';
      data.state = 200;
    } else {
      data.msg = '上传失败';
      data.state = 202;
    }
    res.json(data);
  }).catch(error => {
    console.log(error);
  })
})



module.exports = router;
