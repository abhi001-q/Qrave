const http = require('http');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generate a test manager token
const token = jwt.sign(
  { id: 1, email: 'test@example.com', role: 'manager' },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/orders/all',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, res => {
  let data = '';
  console.log('STATUS:', res.statusCode);
  res.on('data', d => { data += d; });
  res.on('end', () => {
    const parsed = JSON.parse(data);
    console.log('Success:', parsed.success);
    console.log('Total orders:', parsed.data?.length ?? 'N/A');
    if (parsed.data?.length > 0) {
      console.log('First order:', JSON.stringify(parsed.data[0], null, 2));
    } else {
      console.log('Full response:', JSON.stringify(parsed, null, 2));
    }
  });
});

req.on('error', err => console.error('Request error:', err.message));
req.end();
