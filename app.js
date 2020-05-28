const express = require('express');          // 导入模块
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const URL = 'mongodb://localhost/dtec';      // 数据库地址
const app = express();

app.use(express.static('dist'))
app.use(cors({                               // 设置跨域
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))
app.use(cookieParser())
app.use(express.json())                      // 解析参数
app.use(express.urlencoded({ extended: true }))
// 设置路由前缀
app.use('/user', require('./routes/user'));
app.use('/article', require('./routes/article'));
app.use('/category',require('./routes/category'));
app.use('/admin', require('./routes/admin'));
app.use('/img', require('./routes/img'));

app.get('/', (req, res) => {
  res.sendFile('./dist/index.html');
})

mongoose.connect(URL, {                      // 连接数据库
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (error) => {
  if (error) {
    console.log('Failure of database connection...');
  } else {
    console.log('Successful database connection...');
    app.listen(80);
  }
});

