const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
  const configs = [
    { host: 'localhost', user: 'root', password: '1234', database: 'qrave' },
    { host: 'localhost', user: 'root', password: '1234', database: 'defaultdb' },
  ];

  for (const config of configs) {
    console.log(`Testing connection: ${config.user}@${config.host}:${config.database} (password: ${config.password})`);
    try {
      const connection = await mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
      });
      console.log('✅ Connection SUCCESSFUL!');
      await connection.end();
      process.exit(0);
    } catch (err) {
      console.log(`❌ Failed for ${config.database}: ${err.message}`);
    }
  }
  process.exit(1);
}

testConnection();
