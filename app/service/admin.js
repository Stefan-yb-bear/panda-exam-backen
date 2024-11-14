const { Service } = require('egg');

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
    const user = await this.app.mysql.get('admin', { phone: userInfo.phone });
    if (!user) {
      return false;
    }
    return user;
  }
}

module.exports = AdminService;
