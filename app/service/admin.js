const { Service } = require('egg');
const md5 = require('../utils/md5');

class AdminService extends Service {
  /**
   * 用户是否存在
   * @param userInfo
   * @return
   */
  async isExit(userInfo) {
    const user = await this.app.mysql.get('admin', { phone: userInfo.phone });
    if (!user) {
      return false;
    }
    return user;
  }

  /**
   * 获取用户信息
   * @param {*} userInfo
   * @return
   */
  async getUserInfo(userInfo) {
    const user = await this.app.mysql.get('admin', { id: userInfo.id });
    if (!user) {
      return false;
    }
    return user;
  }


  async addAdmin(userInfo) {
    const result = await this.app.mysql.insert('admin', {
      phone: userInfo.phone,
      password: md5.getMd5Data(userInfo.password),
      name: `用户${userInfo.phone}`,
    });
    if (result) {
      return true;
    }
    return false;
  }
}

module.exports = AdminService;
