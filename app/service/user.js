const { Service } = require('egg');
const md5 = require('../utils/md5');
const myDate = require('../utils/myDate');

class UserService extends Service {
  async adduser(userInfo) {
    userInfo.create_time = myDate.getNowDate();
    userInfo.update_time = myDate.getNowDate();
    userInfo.password = md5.getMd5Data(userInfo.password);
    const result = await this.app.mysql.insert('user', {
      phone: userInfo.phone,
      password: md5.getMd5Data(userInfo.password),
      name: `用户${userInfo.phone}`,
      email: userInfo.email,
    });
    if (result) {
      return true;
    }
    return false;
  }

  async delUser(ids) {
    const res = await this.app.mysql.query(
      `delete from user where id in (${ids.join(',')})`
    );
    if (res) {
      return true;
    }
    return false;
  }

  async updateUser(userInfo) {
    userInfo.update_time = myDate.getNowDate();
    const res = await this.app.mysql.update('user', userInfo);
    if (res) {
      return true;
    }
    return false;
  }

  async isExit(userInfo) {
    const res = await this.app.mysql.get('user', { phone: userInfo.phone });
    if (res) {
      return res;
    }
    return false;
  }

  async getUserInfo(id) {
    const res = await this.app.mysql.get('user', { id });
    if (res) {
      res.password = null;
      return res;
    }
    return false;
  }

  async getUsersInfo(pageNum, pageSize, name) {
    if (!pageNum) {
      pageNum = 1;
    }
    if (!pageSize) {
      pageSize = 10;
    }
    const total = await this.app.mysql.count('user');
    let where = '';
    if (name) {
      where = `WHERE name LIKE '%${name}%'`;
    }
    const res = await this.app.mysql.query(`SELECT * FROM user ${where} LIMIT ?, ?`, [ (pageNum - 1) * pageSize, pageSize ]);
    if (res) {
      for (let i = 0; i < res.length; i++) {
        res[i].password = null;
      }
      return {
        users: res,
        total,
      };
    }
    return false;
  }
}

module.exports = UserService;

