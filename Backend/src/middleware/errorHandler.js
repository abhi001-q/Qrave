const { sendSuccess, sendError } = require('../utils/apiResponse');

const fs = require('fs');
const path = require('path');
const logFile = path.join(__dirname, '../../global-error.log');

module.exports = (err, req, res, next) => {
  // Explicitly set CORS for error responses to prevent "No Access-Control-Allow-Origin" error
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');

  const logMsg = `[${new Date().toISOString()}] GLOBAL ERROR: ${err.stack}\n`;
  fs.appendFileSync(logFile, logMsg);
  
  console.error('❌ Error:', err.message);
  const status = err.status || 500;
  
  // Return detailed error in response for debugging
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err.stack,
    hint: 'Check Render logs for full details'
  });
};
