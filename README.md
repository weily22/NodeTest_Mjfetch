# NodeTest_Mjfetch
node mock interface test Mjfetch library

对 [mj-fetch](https://www.npmjs.com/package/mj-fetch) 资源请求库的使用测试。

### 运行方式

#### 安装

```bash
npm install // 安装node服务的依赖

cd view-ui
npm install // 安装前端环境的依赖
```



#### 启动 node 服务

```bash
npm run serve // 在项目根目录运行该命令
```

#### 启动前端库 (react)

```bash
cd view-ui // 进入 view-ui目录
npm start  // 启动，端口地址 http://localhost:3000/
```

#### mj-fetch 库引入方式

```js
import mjFetch from 'mj-fetch';
```

#### 测试例子

```react
// get 方式测试
mjFetch.get("http://localhost:3030/user").then((res) => {
  if (res.status === 200) {
    setUserList(res.data)
  }
})

// post 方式测试 参数为（url, data, opts）
mjFetch.post('http://localhost:3030/user', userInfo).then((res) => {
  if (res.status === 200) {
    alert("添加成功： " + JSON.stringify(res.data))
  }
})

// fetch 写法测试 （get, post 请求同样方式）
mjFetch.fetch({
  url: `http://localhost:3030/user/${id}`,
  method: 'Delete',
}).then((res) => {
  if (res.status === 200) {
    alert(res.message)
  }
})

// 其他参数设置
mjFetch.fetch({
  url: 'your request url',
  method: 'GET', // post, delete, put 不区分大小写
  mode: 'no-cors', // no-cors(默认)
  withCredentials: true, // true(默认) 是否开启 cookie 头部授权
  credentials: 'include', // include(默认)
  header: {}, // header头设置
  data: { name: 'mi' },  // 请求参数 get请求的data会自动转换为querystring形式
  timeout: 6000, // 超时请求设置，单位毫秒
  before: () => {}, // 请求前回调 >=1.1.2
  after: () => {},  // 请求后回调 >=1.1.2
}).then((res) => {
  if (res.status === 200) {
    alert(res.message)
  }
})

```

#### 自定义fetch 封装

```js
import { MjFetchApi } from 'mj-fetch'; // 版本 >=1.1.2
```

具体示例参考 [CustomDemo](https://github.com/weily22/NodeTest_Mjfetch/blob/main/src/view-ui/src/demo/CustomDemo/CustomDemo.jsx)

