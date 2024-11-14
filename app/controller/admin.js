const BaseController = require('./base');
const md5 = require('../utils/md5');
class AdminController extends BaseController {


  async login() {
    const { ctx } = this;
    ctx.validate({
      phone: { type: 'phone' },
      password: { type: 'password' },
    });
    const userInfo = ctx.request.body;
    const loginTimes = await ctx.service.redis.get(userInfo.phone) ?? 0;
    if (loginTimes >= 4) {
      this.fail('密码错误次数过多 请稍后再试');
      return;
    }

    const isExit = await ctx.service.admin.isExit(userInfo);
    if (isExit) {
      const md5Data = md5.getMd5Data(userInfo.password);
      if (md5Data === isExit.password) {
        const token = this.app.jwt.sign({ phone: isExit.phone }, this.app.config.jwt.secret);
        // 登录成功设置 最近登录次数为0
        await ctx.service.redis.set(userInfo.phone, 0, 60 * 30);
        this.success(`Bearer ${token}`);
      } else {
        // 登录失败 最近登录次数+1
        await ctx.service.redis.set(userInfo.phone, loginTimes + 1, 60 * 30);
        this.fail(loginTimes, '用户不存在或密码错误');
      }
    } else {
      // 登录失败 最近登录次数+1
      await ctx.service.redis.set(userInfo.phone, loginTimes + 1, 60 * 30);
      this.fail(loginTimes, '用户不存在或密码错误');
    }
  }

  async registry() {
    const { ctx } = this;
    ctx.validate({
      phone: { type: 'phone' },
      password: { type: 'password' },
    });
    const userInfo = ctx.request.body;
    const isExit = await ctx.service.admin.isExit(userInfo);
    if (isExit) {
      this.fail('用户已存在');
    } else {
      const result = await ctx.service.admin.addAdmin(userInfo);
      if (result) {
        this.success('注册成功');
      } else {
        this.fail('注册失败');
      }
    }
  }

  async me() {
    const { ctx } = this;
    const token = ctx.request.header.authorization?.slice(7);
    if (!token) {
      this.fail();
    }
    let userInfo = this.app.jwt.decode(token);
    userInfo = await ctx.service.admin.getUserInfo(userInfo);
    if (userInfo) {
      this.success({
        phone: userInfo.phone,
        name: userInfo.name,
        email: userInfo.email,
        update_time: userInfo.update_time,
        create_time: userInfo.create_time,
      });
    } else {
      this.fail('用户不存在');
    }
  }
}

module.exports = AdminController;
