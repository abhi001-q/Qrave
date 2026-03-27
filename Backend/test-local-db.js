const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
  const configs = [
    { host: 'localhost', user: 'root', password: '', database: 'qrave' },
    { host: 'localhost', user: 'root', password: 'root', database: 'qrave' },
    { host: 'localhost', user: 'root', password: '', database: 'defaultdb' },
    { host: 'localhost', user: 'root', password: 'root', database: 'defaultdb' },
  ];

  for (const config of configs) {
    console.log(`Testing connection: ${config.user}@${config.host}:${config.database} (password: ${config.password ? 'set' : 'empty'})`);
    try {
      const connection = await mysql.createConnection(config);
      console.log('✅ Connection SUCCESSFUL!');
      await connection.end();
      process.exit(0);
    } catch (err) {
      console.log(`❌ Failed: ${err.message}`);
    }
  }
  process.exit(1);
}

testConnection();
