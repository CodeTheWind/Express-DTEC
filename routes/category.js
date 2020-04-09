const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

let data;

router.use((req, res, next) => {
  data = {
    msg: '',
    state: 0,
  };
  next();
})

/**
 * 获取分类列表
 */
router.get('/list', async (req, res) => {
  Category.find().populate(['creator']).then(res => {
    data.msg = '分类列表';

    let category = [];

    res.forEach(item => {
      let newItem = JSON.parse(JSON.stringify(item));
      const creator = item.creator.username;

      newItem.creator = creator;
      category.push(newItem);
    })

    data.data = category;
  }).then(() => {
    res.json(data);
  }).catch(error => {
    console.log(error);
  })
})

module.exports = router;
