const http = require('http');

const data = JSON.stringify({
  tableId: 1,
  totalAmount: 15.50,
  items: [
    { productId: 1, quantity: 1, price: 15.50 }
  ],
  paymentMethod: "CASH",
  orderType: "Dine-in"
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/orders',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  console.log(`STATUS: ${res.statusCode}`);
  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
