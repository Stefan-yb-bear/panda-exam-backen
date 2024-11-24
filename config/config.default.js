module.exports = appInfo => {

  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1730034711037_6514';

  // add your middleware config here
  config.middleware = [];
  // 设置session
  config.session = {
    key: 'PANDAEXAM',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  };
  config.cluster = {
    listen: {
      path: '',
      port: 9173,
      hostname: '192.168.31.245',
    },
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.cors = {
    // 任何地址都可以访问
    origin: '*',
    // 指定地址才可以访问
    allowMethods: 'GET,PUT,POST,DELETE',
    // cookie跨域配置
    credentials: true,
  };
  // mysql
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'panda_exam_mysql',
    },

    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  // jwt
  config.jwt = {
    secret: 'panda-exam',
    enable: true,
    match: /^\/(?!login|reg|me).*$/,
    sign: {
      expiresIn: '24h',
    },
  };
  // redis
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: 'root',
      db: 0,
    },
  };
  // userConfig
  const userConfig = {
    myAppName: 'panda-exam',
  };
  // validateRoot
  config.validate = {
    convert: true,
    widelyUndefined: true,
  };


  return {
    ...config,
    ...userConfig,
  };
};
