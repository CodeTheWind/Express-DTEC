const express = require('express');
const router = express.Router();
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');

let data;

router.use((req, res, next) => {
  data = {
    msg: '',
    state: 0,
  };
  next();
})

/**
 * 返回头像图片
 */
router.get('/avatar/:filename', async (req, res) => {
  const avatar = req.params.filename;
  const avatarPath = path.join(__dirname, '../public/avatar/');

  res.sendFile(avatarPath + avatar);
})

/**
 * 上传头像
 */
router.post('/upload', async (req, res) => {
  let form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.keepExtensions = true;
  form.uploadDir = path.join(__dirname, '../public/avatar/');

  form.parse(req, (error, fidlds, files) => {
    if (error) {
      return next(error);
    }

    let imgPath = files.file.path;
    let imgName = files.file.name;

    let extname = path.extname(imgName);
    let newName = "avatar_" + Math.random().toString(36).substr(2) + extname;
    let newPath = path.join(__dirname, '../public/avatar/') + newName;

    fs.rename(imgPath, newPath, (error) => {
      if (error) {
        console.log(error);
      } else {
        data.msg = '上传成功！';
        data.state = 200;
        data.data = {
          path: '/img/avatar/' + newName,
          name: newName,
        };
        res.json(data);
      }
    })
  })
})

module.exports = router;