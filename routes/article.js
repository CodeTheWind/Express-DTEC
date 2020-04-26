const express = require('express');
const Article = require('../models/Article');
const Comment = require('../models/Comment');
const Collection = require('../models/Collection');
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
 * 获取文章列表
 */
router.get('/get/list', async (req, res) => {
  const keyword = req.query.keyword || '';   // 搜索关键字
  const category = req.query.category || 0;      // 分类id
  const count = Number(req.query.count) || 10;       // 每页显示的条数
  const page = Number(req.query.page) || 1;          // 页数
  const skip = (page - 1) * count;           // 查询时忽略的条数

  Article.find().countDocuments().then(count => {
    data.total = count;
  });

  if (category == 0) {
    Article.find({ title: { $regex: keyword } }).limit(count).skip(skip)
      .populate([
        { path: 'author', select: 'username' },
        { path: "category", select: ['typeId', 'typeName'] }
      ]).sort({
        _id: -1
      }).then(articles => {
        data.msg = '全部文章列表';

        articles.forEach(item => {
          item.comments = undefined;
          item.content = undefined;
        })

        data.data = articles;

      }).then(() => {
        res.json(data);
      }).catch(error => {
        console.log(error);
      })

  } else {

    Article.find({ title: { $regex: keyword }, category }).limit(count).skip(skip)
      .populate([
        { path: 'author', select: 'username' },
        { path: "category", select: ['typeId', 'typeName'] }
      ]).sort({
        _id: -1
      }).then(articles => {
        data.msg = '全部文章列表';

        articles.forEach(item => {
          item.comments = undefined;
          item.content = undefined;
        })

        data.data = articles;

      }).then(() => {
        res.json(data);
      }).catch(error => {
        console.log(error);
      })
  }
})

/**
 * 获取特殊文章列表 - 动态路由
 */
router.get('/get/list/:listType', async (req, res) => {
  const count = req.query.count || 7;
  const author = req.query.ids;
  const type = req.params.listType

  switch (type) {
    // 最热门的文章列表
    case 'hot':
      Article.find().limit(count).sort({
        views: -1,
      }).then(articles => {
        data.msg = '最热文章';
        data.state = 200;

        articles.forEach(item => {
          item.content = undefined;
        });
        data.data = articles;
        res.json(data);
      }).catch(error => {
        console.log(error);
      });
      break;
    // 最受欢迎的文章列表
    case 'popular':
      Article.find().limit(count).sort({
        likes: -1,
      }).then(articles => {
        data.msg = '最热文章';
        data.state = 200;

        articles.forEach(item => {
          item.content = undefined;
        });
        data.data = articles;
        res.json(data);
      }).catch(error => {
        console.log(error);
      });
      break;
    // 某一用户发布的文章
    case 'user':
      if (author) {
        Article.find({ author }).populate('category')
          .sort({ _id: -1 }).then(articles => {

            if (articles.length > 0) {
              data.msg = author;
              data.state = 200;

              articles.forEach(item => {
                item.content = undefined;
              });
              data.data = articles;
              res.json(data);
            } else {
              data.msg = '该用户没有发布过文章或该用户不存在！';
              data.state = 404;
              data.data = [];
              res.json(data);
            }
          }).catch(error => {
            console.log(error);
          })
      } else {
        data.msg = '未传入用户的id';
        data.state = 404;
        res.json(data);
      }
      break;
    default:
      data.msg = '没有该类型的文章列表！';
      data.state = 404;
      res.json(data);
      break;
  }
})

/**
 * 获取文章详情
 */
router.get('/get/details', async (req, res) => {
  const ids = req.query.ids;

  Article.findOne({ _id: ids }).populate('category')
    .then(article => {

      if (!article) {
        data.msg = '文章不存在';
        data.state = 404;
        return;
      } else {
        data.msg = '文章详情';
        data.data = article;
        article.views++;
        article.save();
      }

    }).then(() => {
      res.json(data);
    }).catch(error => {
      console.log(error);
      data.state = 404;
      res.json(data);
    })
})

/**
 * 获取文章评论
 */
router.get('/get/comments', async (req, res) => {
  const ids = req.query.ids;

  Comment.find({ article: ids }).populate('user').sort({ _id: -1 }).then(comment => {
    data.state = 200;
    data.msg = '评论列表';

    let newComment = [];

    comment.forEach(item => {
      const user = {
        _id: item.user._id,
        avatar: item.user.avatar,
        username: item.user.username
      };
      let newItem = JSON.parse(JSON.stringify(item));
      newItem.user = user;
      newComment.push(newItem);
    })

    data.data = newComment;
  }).then(() => {
    res.json(data);
  }).catch(error => {
    console.log(error);
  })
})

/**
 * 评论文章
 */
router.post('/add/comment', async (req, res) => {
  const article = req.body.ids;
  const user = req.cookies.userIds;

  if (user) {
    new Comment({
      article,
      user,
      content: req.body.content,
      date: localDate.localDate(),
    }).save().then(comment => {
      if (comment) {
        data.msg = '评论成功！';
        data.state = 200;
      } else {
        data.msg = '评论失败！';
        data.state = '202';
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
 * 点赞文章
 */
router.post('/update/likes', async (req, res) => {
  const ids = req.body.ids;

  Article.findOne({ _id: ids }).then(res => {
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
 * 发表文章
 */
router.post('/add', async (req, res) => {
  const userIds = req.cookies.userIds;

  if (userIds) {
    if (userIds === req.body.ids) {
      new Article({
        title: req.body.title,
        des: req.body.des,
        content: req.body.content,
        category: req.body.category,
        tags: req.body.tags,
        date: localDate.localDate(),
        author: userIds
      }).save().then(article => {
        data.msg = '发表成功！';
        data.state = 200;
        data.articleIds = article._id;

        res.json(data);
      }).catch(error => {
        console.log(error);
      })
    } else {
      data.msg = '发布失败，不是作者本人！';
      data.state = 202;
      res.json(data);
    }
  } else {
    data.msg = '未登录';
    data.state = 302;
    res.json(data);
  }
})

/**
 * 用户修改文章
 */
router.post('/update', async (req, res) => {
  const author = req.cookies.userIds;
  const ids = req.body.ids;
  const title = req.body.title;
  const des = req.body.des;
  const content = req.body.content;
  const category = req.body.category;
  const tags = req.body.tags;

  if (author) {
    Article.findOne({ _id: ids }).then(article => {

      if (article.author._id == author) {
        article.title = title;
        article.des = des;
        article.content = content;
        article.category = category;
        article.tags = tags;

        return article.save();
      } else {
        data.msg = '修改失败，修改的不是自己的文章！';
        data.state = 202;
        return;
      }
    }).then(article => {

      if (article) {
        data.msg = '修改成功！';
        data.state = 200;
        data.ids = article._id;
      }

      res.json(data);
    }).catch(error => {
      data.msg = error;
      data.state = 404;
      res.json(data);
    })
  } else {
    data.msg = '未登录';
    data.state = 302;
    res.json(data);
  }
})

/**
 * 用户删除文章
 */
router.post('/delete', async (req, res) => {
  const ids = req.body.ids;

  Article.deleteOne({ _id: ids }).then(res => {
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
 * 收藏文章
 */
router.post('/add/collection', async (req, res) => {
  const user = req.cookies.userIds;
  const article = req.body.ids;

  Collection.findOne({ user, article }).then(collection => {

    if (collection) {
      data.msg = '你已经收藏过该文章了！';
      data.state = 202;
      return;
    } else {
      return new Collection({ user, article }).save();
    }
  }).then(collection => {
    if (collection) {
      data.msg = '收藏成功！';
    }
    res.json(data);
  })
})

/**
 * 取消收藏文章
 */
router.post('/cancel/collection', async (req, res) => {
  const id = req.body.ids;

  Collection.deleteOne({ _id: id }).then(res => {
    console.log(res);

    if (res) {
      data.msg = '取消收藏成功！';
      data.state = 200;
    } else {
      data.state = 202;
    }
  }).then(() => {
    res.json(data);
  })
})

/**
 * 用户的收藏列表
 */
router.get('/get/collections', async (req, res) => {
  const user = req.query.ids;

  Collection.find({ user }).populate([
    {
      path: 'article',
      populate:
        [
          { path: 'author', select: 'username' },
          { path: 'category', select: 'typeName' }
        ]
    }
  ]).then(collections => {
    data.msg = '用户收藏列表';
    data.data = collections;
    res.json(data);
  })
})


module.exports = router;
