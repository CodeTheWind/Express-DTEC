const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const URL = 'mongodb://localhost/dtec';

const app = express();

app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.sendFile('./dist/index.html');
})

// 关闭跨域
app.use(cors({
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  // origin: 'http://127.0.0.1',
  credentials: true,
}))

app.use(cookieParser())

// 解析参数
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 设置路由前缀
app.use('/user', require('./routes/user'));
app.use('/article', require('./routes/article'));
app.use('/category',require('./routes/category'));
app.use('/admin', require('./routes/admin'));
app.use('/img', require('./routes/img'));

// 连接数据库
mongoose.connect(URL, {
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