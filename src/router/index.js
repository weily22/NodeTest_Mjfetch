const Router = require('koa-router');
const controllers = require('./../controllers')

const router = new Router();

router
  .get('/user', controllers.getUserList)
  .get('/user/:id', controllers.getUserById)
  .post('/user', controllers.addUser)
  .post('/upload', controllers.upload)
  .delete('/user/:id', controllers.deleteUsersById)


module.exports = router;