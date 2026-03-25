const { sendSuccess, sendError } = require('../utils/apiResponse');

const fs = require('fs');
const path = require('path');
const logFile = path.join(__dirname, '../../global-error.log');

module.exports = (err, req, res, next) => {
  const logMsg = `[${new Date().toISOString()}] GLOBAL ERROR: ${err.stack}\n`;
  fs.appendFileSync(logFile, logMsg);
  
  console.error('❌ Error:', err.message);
  const status = err.status || 500;
  sendError(res, status, err.message || 'Internal Server Error');
};
