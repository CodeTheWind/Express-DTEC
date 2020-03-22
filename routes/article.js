const express = require('express');
const Article = require('../models/Article');
const User = require('../models/User');
const router = express.Router();
const localDate = require('../utils/getCurrentDate');

let data;

router.use((req, res, next) => {
  data = {
    msg: '',
    state: 0,
  }
  next();
});

/**
 * 获取文章列表
 */
router.get('/list', async (req, res) => {
  const keyword = req.query.keyword || '';   // 搜索关键字
  const typeId = req.query.typeId || 0;      // 分类id
  const count = req.query.count || 10;       // 每页显示的条数
  const page = req.query.page || 1;          // 页数
  const skip = (page - 1) * count;           // 查询时忽略的条数

  if (typeId == 0) {
    Article.find({ title: { $regex: keyword } }).limit(count).skip(skip).sort({
      _id: -1
    }).then(res => {
      data.msg = '文章列表';

      let items = [];
      res.forEach(item => {
        items.push({
          ids: item.ids,
          title: item.title,
          des: item.des,
          date: item.date,
        })
      });

      data.data = items;
    }).then(() => {
      res.json(data);
    }).catch(error => {
      console.log(error);
    })

  } else {

    Article.find({ typeId, title: { $regex: keyword } }).limit(count).skip(skip).sort({
      _id: -1
    }).then(res => {
      data.msg = '文章列表';

      let items = [];
      res.forEach(item => {
        items.push({
          ids: item.ids,
          title: item.title,
          des: item.des,
          date: item.date,
        })
      });

      data.data = items;
    }).then(() => {
      res.json(data);
    }).catch(error => {
      console.log(error);
    })
  }
})

/**
 * 获取文章详情
 */
router.get('/details', async (req, res) => {
  const ids = req.query.ids || '';

  Article.findOne({ ids }).then(res => {

    if (!res) {
      data.msg = '文章不存在';
      data.state = 404;
      return;
    } else {
      data.msg = '文章详情';
      data.articleData = res;

      res.views++;
      res.save();

      return User.findOne({
        ids: res.userIds
      })
    }
  }).then(res => {
    if (res) {
      data.userData = res;
      data.userData.password = undefined;
    } else {
      return;
    }
  }).then(() => {
    res.json(data);
  }).catch(error => {
    console.log(error);
  })
})

/**
 * 发表文章
 */
router.post('/post', async (req, res) => {

  new Article({
    title: req.body.title,
    des: req.body.des,
    content: req.body.content,
    typeId: req.body.typeId,
    typeName: req.body.typeName,
    tag: req.body.tag,
    userIds: req.body.userIds,
  }).save().then(res => {
    data.msg = '发表成功！';
    data.articleIds = res.ids;
  }).then(() => {
    res.json(data);
  }).catch(error => {
    console.log(error);
  })
})

/**
 * 单项删除文章
 */
router.post('/delete', async (req, res) => {
  const ids = req.body.ids;

  Article.deleteOne({ ids }).then(res => {
    if (res) {
      data.msg = '删除成功！';
    } else {
      data.msg = '删除失败！';
      data.state = 202;
    }
  }).then(() => {
    res.json(data);
  }).catch(error => {
    console.log(error);
  })
})

/**
 * 编辑文章
 */
router.post('/update', async (req, res) => { })

/**
 * 点赞文章
 */
router.post('/like', async (req, res) => {
  const ids = req.body.ids || '';

  Article.findOne({ ids }).then(res => {
    data.msg = '点赞成功';

    res.likes++;
    res.save();
  }).then(() => {
    res.json(data);
  }).catch(error => {
    console.log(error);
  })
})

/**
 * 评论文章
 */
router.post('/comment', async (req, res) => {
  const ids = req.body.ids || '';
  const userIds = req.cookies.userIds;

  let comment = {
    avatar: '',
    username: '',
    content: req.body.comment || '',
    date: localDate.localDate(),
  }

  if (userIds) {
    User.findOne({ ids: userIds }).then(res => {

      comment.avatar = res.avatar;
      comment.username = res.username;

      return Article.findOne({ ids });
    }).then(res => {

      res.comments.push(comment);
      res.save();
      data.msg = '评论成功！';

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
 * 获取用户发布的文章
 */
router.get('/list/userpost', async (req, res) => {
  const userIds = req.query.ids;

  User.findOne({ ids: userIds }).then(res => {
    if (!res) {
      data.msg = '用户不存在！';
      data.state = 404;
      return;
    } else {
      return Article.find({ userIds }).sort({ _id: -1 });
    }
  }).then(res => {
    if (res) {
      let likes = 0;
      let views = 0;
      data.msg = userIds;
      res.forEach(item => {
        item.content = undefined;
        item.typeId = undefined;
        item.tag = undefined;
        likes += item.likes;
        views += item.views;
      })
      data.data = res;
      data.likes = likes;
      data.views = views;
    }
  }).then(() => {
    res.json(data);
  }).catch(error => {
    console.log(error);
  })
})


module.exports = router;