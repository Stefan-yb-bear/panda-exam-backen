const crypto = require('crypto');

function getMd5Data(data) {
  return crypto.createHash('md5').update(data).digest('hex');
}

module.exports = {
  getMd5Data,
};
