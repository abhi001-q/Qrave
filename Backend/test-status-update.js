const http = require('http');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Simulate a manager token
const token = jwt.sign(
  { id: 1, email: 'test@example.com', role: 'manager' },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

const body = JSON.stringify({ status: 'PREPARING' });

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/orders/22/status',
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Content-Length': body.length
  }
};

const req = http.request(options, res => {
  let data = '';
  console.log('STATUS:', res.statusCode);
  res.on('data', d => { data += d; });
  res.on('end', () => console.log('RESPONSE:', data));
});

req.on('error', err => console.error('Error:', err.message));
req.write(body);
req.end();
