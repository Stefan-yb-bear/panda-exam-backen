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

  async updateUser() {
    const { ctx } = this;
    ctx.validate({
      phone: { type: 'phone' },
      email: { type: 'email' },
      name: { type: 'string' },
    });
    const userInfo = ctx.request.body;
    const isExit = await ctx.service.user.isExit(userInfo);
    if (isExit) {
      userInfo.id = isExit.id;
      Object.assign(isExit, userInfo);
      const res = await ctx.service.user.updateUser(isExit);
      if (res) {
        this.success('修改成功');
      } else {
        this.fail('修改失败');
      }
    } else {
      this.fail('用户不存在');
    }
  }

  async getUser() {
    const { ctx } = this;
    const data = ctx.query;
    const { id, pageNum, pageSize, name = '' } = data;
    if (!id) {
      const res = await ctx.service.user.getUsersInfo(Number(pageNum), Number(pageSize), name);
      if (res) {
        this.success(res);
      } else {
        this.fail('用户不存在');
      }
    } else {
      const res = await ctx.service.user.getUserInfo(id);
      if (res) {
        this.success(res);
      } else {
        this.fail('用户不存在');
      }
    }

  }
}

module.exports = UserController;
