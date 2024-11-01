
const zz = require('../utils/zz');

module.exports = app => {

  const { validator } = app;

  validator.addRule('phone', (rule, value) => {
    if (!zz.phone.test(value)) {
      return '手机号格式错误';
    }
  });

  validator.addRule('password', (rule, value) => {
    if (value.length < 8 || value.length > 20) {
      return '密码格式错误';
    }
  });

};
