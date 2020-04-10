const express = require('express');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');

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
 * 返回头像图片
 */
router.get('/avatar/:filename', async (req, res) => {
  const avatar = req.params.filename;
  const avatarPath = path.join(__dirname, '../public/avatar/');

  res.sendFile(avatarPath + avatar);
})

/**
 * 返回banner图片
 */
router.get('/banner/:filename', async (req, res) => {
  const banner = req.params.filename;
  const bannerPath = path.join(__dirname, '../public/banner/');

  res.sendFile(bannerPath + banner);
})


/**
 * 上传图片
 */
router.post('/upload/:imgCategory', async (req, res) => {
  const imgCategory = req.params.imgCategory;
  let form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.keepExtensions = true;
  form.uploadDir = path.join(__dirname, '../public/' + imgCategory + '/');

  form.parse(req, (error, fidlds, files) => {
    if (error) {
      return next(error);
    }

    let imgPath = files.file.path;
    let imgName = files.file.name;

    let extname = path.extname(imgName);
    let newName = imgCategory + "_" + Math.random().toString(36).substr(2) + extname;
    let newPath = path.join(__dirname, '../public/' + imgCategory + '/') + newName;

    fs.rename(imgPath, newPath, (error) => {
      if (error) {
        console.log(error);
      } else {
        data.msg = '上传成功！';
        data.state = 200;
        data.data = {
          path: '/img/' + imgCategory + '/' + newName,
          name: newName,
        };
        res.json(data);
      }
    })
  })
})

module.exports = router;