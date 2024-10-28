const UAParser = require('ua-parser-js');
function isMobileDevice(userAgent) {
  // 创建一个UAParser实例来解析User-Agent字符串
  const parser = new UAParser(userAgent);

  // 获取设备信息
  const device = parser.getDevice();
  const browser = parser.getBrowser();
  const os = parser.getOS();

  // 判断是否为移动设备，通常包括手机和平板
  return (
    device.type === 'mobile' ||
    device.type === 'tablet' ||
    os.name === 'Android' ||
    os.name === 'iOS' ||
    browser.name === 'Mobile Safari'
  );
}

module.exports = {
  isMobileDevice,
};
