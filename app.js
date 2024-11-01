'use strict';

const path = require('path');

module.exports = app => {
  // 加载所有的校验规则
  this.app = app;
  const directory = path.join(app.config.baseDir, './app/validate');
  app.loader.loadToApp(directory, 'validate');

  const errorHandle = require('./app/middleware/error_handler')({}, this.app);
  this.app.use(errorHandle);
};

