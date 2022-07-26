const path = require('path');
const nodeExcel = require('excel-export');
const mnData = [
  { id: 1, name: 'xm', age: '25', hobby: 'swimming' },
  { id: 2, name: '江江', age: '35', hobby: 'reading' },
  { id: 3, name: '张三', age: '15', hobby: 'none' },
]

const exportFunc = (ctx) => {
  // const data = ctx.request.body;
  let conf = {};
  let fileName = "mj导出测试";
  conf.name = "mjSheet"; // 标识在excel底部的表名。
  conf.cols = [{
    caption:'项目名称',
    type:'string',
    beforeCellWrite: function(row, cellData){
      return cellData;//这里可对数据进行格式化处理，如无需处理可直接不写即可
    },
    width:28.7109375
  }, {
    caption:'开始日期',
    type:'date',
    beforeCellWrite:function(){
      const originDate = new Date(Date.UTC(1899,11,30));
      return function(row, cellData, eOpt){
        if (eOpt.rowNum%2){
          eOpt.styleIndex = 1;
        }
        else{
          eOpt.styleIndex = 2;
        }
        if (cellData === null){
          eOpt.cellType = 'string';
          return 'N/A';
        } else
          return (cellData - originDate) / (24 * 60 * 60 * 1000);
      }
    }()
  }, {
    caption:'是否延期',
    type:'bool'
  }, {
    caption:'数量',
    type:'number'
  }]
  conf.rows = [
    ["a项目", new Date(Date.UTC(2018, 4, 1)), true, 1],
    ["b项目", new Date(2020, 4, 1), false, 2],
    ["c项目", new Date(), false, 3],
    ["d项目", null, true, 4]
  ];
  let result = nodeExcel.execute(conf);
  const exportBody = Buffer.from(result, 'binary');
  ctx.set({
    'Content-Type': 'application/vnd.openxmlformats;charset=utf-8',
    'Content-Disposition': `attachment; filename=${encodeURIComponent(fileName)}.xlsx`,
  })
  ctx.body = exportBody;

}

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
    case 'export':
      exportFunc(ctx)
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
  export: (ctx, next) => deal(ctx, next, 'export'),
  test: (ctx, next) => deal(ctx, next, 'test'),
}