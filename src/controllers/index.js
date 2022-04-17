const path = require('path');
const mnData = [
  { id: 1, name: 'xm', age: '25', hobby: 'swimming' },
  { id: 2, name: '江江', age: '35', hobby: 'reading' },
  { id: 3, name: '张三', age: '15', hobby: 'none' },
]

function deal(ctx, next, name) {
  switch (name) {
    case 'getUserById':
      ctx.body = {
        data: getUserById(ctx.params.id),
        status: 200,
        message: "success"
      }
      break;
    case 'getUserList':
      const { name } = ctx.query;
      ctx.body = {
        status: 200,
        message: "success",
        data: name ? getUserByName(name) : getUserList(ctx.query.id),
      }
      break;
    case 'addUser':
      ctx.body = {
        status: 200,
        message: "success",
        data: addUser(ctx.request.body),
      }
      break;
    case 'deleteUsersById':
      const { id } = ctx.params
      ctx.body = {
        status: 200,
        message: deleteUsersById(id),
        data: null,
      }
      break;
    case 'upload':
      if (!ctx.request.files.file) {
        ctx.body = {
          status: 400,
          message: '请选择上传图片!',
        }
        break;
      }
      const username = ctx.request.body.username;
      const file = ctx.request.files.file;
      const basename = path.basename(file.path)
      ctx.body = {
        status: 200,
        data: {
          username,
          name: file.name,
          url: `${ctx.origin}/uploads/${basename}` ,
        }
      }
      break;
    case 'test':
      console.log('ctx.request', ctx.request)
      const authorization =  ctx.request.header.authorization;
      if (authorization && authorization === 'xm-token') {
        ctx.body = {
          code: 0,
          message: "正常token哦"
        }
      } else {
        ctx.body = {
          code: 1,
          message: "token失效"
        }
      }

  }
}

function getUserById(id) {
  return mnData.find(item => item.id === +id);
}

function getUserByName(name) {
  return mnData.find(item => item.name === name);
}

function getUserList(id = null) {
  if (id) {
    return getUserById(id)
  }
  return mnData;
}

function addUser(userInfo = {}) {
  return userInfo;
}

function deleteUsersById(id) {
  const deleteItem = mnData.filter(item => item.id === +id);
  return `已删除${deleteItem[0].name}`
}


module.exports = {
  getUserById: (ctx, next) => deal(ctx, next, 'getUserById'),
  getUserList: (ctx, next) => deal(ctx, next, 'getUserList'),
  addUser: (ctx, next) => deal(ctx, next, 'addUser'),
  deleteUsersById: (ctx, next) => deal(ctx, next, 'deleteUsersById'),
  upload: (ctx, next) => deal(ctx, next, 'upload'),
  test: (ctx, next) => deal(ctx, next, 'test'),
}