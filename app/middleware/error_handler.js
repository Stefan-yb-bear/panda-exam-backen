const HttpException = require('../exception/http');
module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      if (err instanceof HttpException) {
        ctx.status = err.httpCode;
        ctx.body = {
          code: err.code,
          msg: err.msg,
          data: err.data,
        };
        return;
      }
      if (err.code === 'invalid_param') {
        ctx.status = 200;
        ctx.body = {
          code: 402,
          msg: err.errors[0].message,
          data: null,
        };
        return;
      }
      if (err.message === 'invalid token') {
        ctx.status = 200;
        ctx.body = {
          code: 401,
          msg: '身份失效',
          data: err.message,
        };
        return;
      }
      console.warn(',==========', err);

      // 最后其他异常统一处理
      ctx.status = 500;
      ctx.body = {
        code: 50000,
        msg: err.message || '服务器异常',
        data: null,
      };
    }
  };
};
