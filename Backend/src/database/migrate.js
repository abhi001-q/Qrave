const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

async function runMigrations() {
  console.log('--- Starting Database Migrations ---');
  try {
    const migrationsDir = path.join(__dirname, 'migrations');
    const files = fs.readdirSync(migrationsDir)
      .filter(f => f.endsWith('.js'))
      .sort();

    for (const file of files) {
      console.log(`Running migration: ${file}`);
      const migration = require(path.join(migrationsDir, file));
      if (typeof migration.up === 'function') {
        await migration.up();
      }
    }
    console.log('--- All Migrations Completed successfully ---');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    pool.end();
  }
}

runMigrations();
