const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const koaStatic = require('koa-static')
const path = require('path');

const PORT = 3030;
const router = require('./router');
const middlewares = require('./middlewares');

app.use(cors({
  origin: function(ctx) { //设置允许来自指定域名请求
    return 'http://localhost:3000'; //只允许http://localhost:3000这个域名的请求
  },
  maxAge: 5, //指定本次预检请求的有效期，单位为秒。
  credentials: true, //是否允许发送Cookie
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
}));
app.use(koaBody({
  // 支持文件格式
  multipart: true,
  formidable: {
    // 上传目录
    // uploadDir: path.join(__dirname, 'public/uploads'),
    uploadDir: path.join(__dirname, 'public/uploads'),
    // 保留文件扩展名
    keepExtensions: true,
  }
}));
app.use(koaStatic(path.join(__dirname, 'public')))
app.use(router.routes(), router.allowedMethods());
app.use(middlewares.handleResponse)

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`)
});