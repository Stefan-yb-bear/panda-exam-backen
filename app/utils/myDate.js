const moment = require('moment');

const getNowDate = () => {
  const isoString = new Date(Date.now()).toISOString();
  return moment(isoString).format('YYYY-MM-DD HH:mm:ss');
};

module.exports = {
  getNowDate,
};

