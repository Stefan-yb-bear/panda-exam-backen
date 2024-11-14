const { Service } = require('egg');
const md5 = require('../utils/md5');

class UserService extends Service {
  async adduser(userInfo) {
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

  async isExit(userInfo) {
    const res = await this.app.mysql.get('user', { phone: userInfo.phone });
    if (res) {
      return true;
    }
    return false;
  }
}

module.exports = UserService;

