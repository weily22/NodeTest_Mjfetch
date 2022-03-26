const mnData = [
  { id: 1, name: 'xm', age: '25', hobby: 'swimming' },
  { id: 2, name: '江江', age: '35', hobby: 'reading' },
  { id: 3, name: '张三', age: '15', hobby: 'none' },
]

function deal(ctx, next, name) {
  console.log('name', name)
  console.log('ctx.params', ctx.params)
  console.log('ctx.request', ctx.request)
  console.log('ctx.query', ctx.query)
  console.log('ctx.body', ctx.body)
  switch (name) {
    case 'getUserById':
      ctx.body = {
        data: getUserById(ctx.params.id),
        status: 200,
        message: "success"
      }
      break;
    case 'getUserList':
      ctx.body = {
        status: 200,
        message: "success",
        data: getUserList(ctx.query.id),
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
  }
}

function getUserById(id) {
  return mnData.find(item => item.id === +id);
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
}