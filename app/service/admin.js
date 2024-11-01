const { Service } = require('egg');

class AdminService extends Service {
  /**
   * 用户是否存在
   * @return
   */
  async isExit(userInfo) {
    const user = await this.app.mysql.get('admin', { phone: userInfo.phone });
    if(!user){
      return false;
    }
    return user;
  }
}

module.exports = AdminService;
