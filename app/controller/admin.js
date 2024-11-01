const BaseController = require('./base')
const md5 = require('../utils/md5')
const zz = require('../utils/zz')
class AdminController extends BaseController {


  async login () {
    const { ctx } = this
    ctx.validate({
      phone: { type: 'phone' },
      password: { type: 'password' },
    })
    const isExit = await ctx.service.admin.isExit(ctx.request.body)
    if (isExit) {
      let md5Data = md5.getMd5Data(ctx.request.body.password)
      if (md5Data === isExit.password) {
        const token = this.app.jwt.sign({ name: isExit.name, }, this.app.config.jwt.secret)
        this.success(token)
      } else {
        this.fail('用户不存在或密码错误')
      }
    } else {
      this.fail('用户不存在或密码错误')
    }
  }

  async registry () {
    const { ctx } = this
    ctx.validate({
      phone: { type: 'phone' },
      password: { type: 'password' },
    })
    let userInfo = ctx.request.body
    const isExit = await ctx.service.admin.isExit(userInfo)
    if (isExit) {
      this.fail('用户已存在')
    } else {
      const result = await this.app.mysql.insert('admin', {
        phone: userInfo.phone,
        password: md5.getMd5Data(userInfo.password),
      })
      if (result) {
        this.success('注册成功')
      } else {
        this.fail('注册失败')
      }
    }
  }
}

module.exports = AdminController
