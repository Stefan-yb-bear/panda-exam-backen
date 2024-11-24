const BaseController = require('./base');

class BankController extends BaseController {
  async addTag() {
    const { ctx } = this;
    ctx.validate({
      name: { type: 'string' },
    });
    const tagInfo = ctx.request.body;
    const res = await ctx.service.bank.addTag(tagInfo);
    if (res.state) {
      this.success(res.msg);
    } else {
      this.fail(res.msg);
    }
  }

  async updateTag() {
    const { ctx } = this;
    ctx.validate({
      id: { type: 'string' },
      name: { type: 'string' },
    });
    const tagInfo = ctx.request.body;
    const res = await ctx.service.bank.updateTag(tagInfo);
    if (res.state) {
      this.success(res.msg);
    } else {
      this.fail(res.msg);
    }
  }

  async getTags() {
    const { ctx } = this;
    const { id, pageNum, pageSize, name = '' } = ctx.query;
    if (id) {
      const res = await ctx.service.bank.getTag(ctx.query.id);
      if (res) {
        this.success(res);
      } else {
        this.fail('标签不存在');
      }
    } else {
      const res = await ctx.service.bank.getTags(Number(pageNum), Number(pageSize), name);
      if (res) {
        this.success(res);
      } else {
        this.fail('查询失败');
      }
    }
  }
}

module.exports = BankController;
