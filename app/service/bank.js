const { Service } = require('egg');
const myDate = require('../utils/myDate');

class BankService extends Service {
  async addTag(tagInfo) {
    const isExit = await this.app.mysql.get('tag', { name: tagInfo.name });
    if (isExit) {
      return {
        state: false,
        msg: '标签已存在',
      };
    }
    tagInfo.create_time = myDate.getNowDate();
    tagInfo.update_time = myDate.getNowDate();
    const token = this.ctx.request.header.authorization?.slice(7);
    const userInfo = this.app.jwt.decode(token);
    tagInfo.create_by = userInfo.id;
    tagInfo.update_by = userInfo.id;
    const result = await this.app.mysql.insert('tag', tagInfo);
    if (result) {
      return {
        state: true,
        msg: '添加成功',
      };
    }
    return {
      state: false,
      msg: '添加失败',
    };
  }

  async updateTag(tagInfo) {
    tagInfo.update_time = myDate.getNowDate();
    const token = this.ctx.request.header.authorization?.slice(7);
    const userInfo = this.app.jwt.decode(token);
    tagInfo.update_by = userInfo.id;
    const res = await this.app.mysql.update('tag', tagInfo);
    if (res) {
      return {
        state: true,
        msg: '修改成功',
      };
    }
    return {
      state: false,
      msg: '修改失败',
    };
  }

  async getTag(id) {
    const res = await this.app.mysql.get('tag', { id });
    if (res) {
      return res;
    }
    return false;
  }
  async getTags(pageNum, pageSize, name) {
    if (!pageNum) {
      pageNum = 1;
    }
    if (!pageSize) {
      pageSize = 10;
    }
    let where = '';
    if (name) {
      where = `WHERE name LIKE '%${name}%'`;
    }
    const total = await this.app.mysql.count('tag');
    const res = await this.app.mysql.query(`SELECT * FROM tag ${where} LIMIT ?, ?`, [ (pageNum - 1) * pageSize, pageSize ]);
    if (res) {
      return {
        tags: res,
        total,
      };
    }
    return false;
  }
}

module.exports = BankService;

