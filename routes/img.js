const express = require('express');
const router = express.Router();
const path = require('path');

/**
 * 返回头像图片
 */
router.get('/avatar/:filename', async (req, res) => {
  const avatar = req.params.filename;
  const avatarPath = path.join(__dirname, '../public/avatar/');

  res.sendFile(avatarPath + avatar);
})

/**
 * 上传图片
 */
router.post('/post', async (req, res) => {
  
  res.json(1);
})

module.exports = router;