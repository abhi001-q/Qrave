const http = require('http');

async function testTransactionUuid() {
  const postData = JSON.stringify({
    tableId: 1,
    totalAmount: 100.00,
    items: [{ productId: 1, quantity: 1, price: 100 }],
    orderType: 'Dine In',
    paymentMethod: 'eSewa'
  });

  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/orders',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const createOrder = () => new Promise((resolve) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.write(postData);
    req.end();
  });

  const updateTransaction = (orderId, uuid) => new Promise((resolve) => {
    const data = JSON.stringify({ transaction_uuid: uuid });
    const patchOptions = {
      hostname: 'localhost',
      port: 5000,
      path: `/api/orders/${orderId}/transaction`,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    const req = http.request(patchOptions, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(JSON.parse(body)));
    });
    req.write(data);
    req.end();
  });

  try {
    console.log("Creating test order...");
    const orderRes = await createOrder();
    console.log("Order Response:", orderRes);
    if (!orderRes.success) {
      console.error("Order Creation Failed:", orderRes.message);
      return;
    }
    const orderId = orderRes.data.id;
    console.log("Order Created:", orderId);

    const uuid1 = `TEST-QRV-${orderId}-${Date.now()}`;
    console.log("Updating with UUID 1:", uuid1);
    const res1 = await updateTransaction(orderId, uuid1);
    console.log("Update 1 Result:", res1.success);

    const uuid2 = `TEST-QRV-${orderId}-${Date.now() + 100}`;
    console.log("Updating with UUID 2:", uuid2);
    const res2 = await updateTransaction(orderId, uuid2);
    console.log("Update 2 Result:", res2.success);

  } catch (err) {
    console.error("Test failed:", err);
  }
}

testTransactionUuid();
