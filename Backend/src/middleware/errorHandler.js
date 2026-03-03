const { sendSuccess, sendError } = require('../utils/apiResponse');

module.exports = (err, req, res, next) => {
  console.error('❌ Error:', err.message);
  const status = err.status || 500;
  sendError(res, status, err.message || 'Internal Server Error');
};
