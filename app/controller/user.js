const BaseController = require('./base');

class UserController extends BaseController {
  async addUser() {
    const { ctx } = this;
    ctx.validate({
      phone: { type: 'phone' },
      email: { type: 'email' },
      password: { type: 'password' },
    });
    const userInfo = ctx.request.body;
    const isExit = await ctx.service.user.isExit(userInfo);
    if (isExit) {
      this.fail('用户已存在');
      return;
    }
    const res = await ctx.service.user.adduser(userInfo);
    if (res) {
      this.success('添加成功');
    } else {
      this.fail('添加失败');
    }
  }

  async delUser() {
    const { ctx } = this;
    const ids = ctx.request.body;
    if (!ids || !(ids instanceof Array)) {
      this.fail('参数错误');
      return;
    }
    const result = await ctx.service.user.delUser(ids);
    if (result) {
      this.success('删除成功');
    } else {
      this.fail('删除失败');
    }
  }
}

module.exports = UserController;
