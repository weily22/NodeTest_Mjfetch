const handleResponse = ctx => {
  ctx.type = 'application/json'
  ctx.body = {
    code: 200,
    message: ctx.msg || 'success',
    data: ctx.result || null,
  }
}

module.exports = {
  handleResponse
}