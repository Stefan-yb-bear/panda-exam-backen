module.exports = app => {

  const { validator } = app;
  const phoneReg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/;

  validator.addRule('phone', (rule, value) => {
    if (!phoneReg.test(value)) {
      return '手机号格式错误';
    }
  });

  validator.addRule('password', (rule, value) => {
    if (value.length < 8 || value.length > 20) {
      return '密码格式错误';
    }
  });

};
