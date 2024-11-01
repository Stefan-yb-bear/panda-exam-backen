const { Service } = require('egg');

const time = 60 * 60 * 24 //默认缓存失效时间 1天
class RedisService extends Service {
  // 设置
  async set(key, value, seconds) {
    // seconds 有效时长
    let { redis } = this.app;
    value = JSON.stringify(value);
    if(!seconds){
      // await redis.set(key, value);
      await redis.set(key, value, 'EX', time);
    }else{
      // 设置有效时间
      await redis.set(key, value, 'EX', seconds);
    }
  }
  // 获取
  async get(key) {
    let { redis } = this.app;
    let data = await redis.get(key);
    if (!data) return;
    data = JSON.parse(data);
    return data;
  }
  // 清空redis
  async flushall() {
    let { redis } = this.app;
    redis.flushall();
    return;
  }
}
module.exports = RedisService;