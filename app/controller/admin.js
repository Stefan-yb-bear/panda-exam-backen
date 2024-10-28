const BaseController = require('./base');

class AdminController extends BaseController {
  async index() {
    const { ctx } = this;
    this.fail();
    console.log(111);
  }
}

module.exports = AdminController;
