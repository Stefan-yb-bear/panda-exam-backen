const { Controller } = require('egg');

class BaseController extends Controller {
  success(data = null, msg = 'success', code = 200) {
    const { ctx } = this;
    ctx.status = 200;
    ctx.body = {
      code,
      msg,
      data,
    };
  }

  fail(data = null, msg = 'fail', code = 500) {
    const { ctx } = this;
    ctx.status = 200;
    ctx.body = {
      code,
      msg,
      data,
    };
  }
}
module.exports = BaseController;
