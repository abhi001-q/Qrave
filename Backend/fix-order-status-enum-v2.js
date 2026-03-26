const pool = require('./src/config/db');

async function migrate() {
  try {
    console.log("Starting migration to fix orders status ENUM (using app pool)...");
    
    // First, let's update any existing data to uppercase to avoid truncation during MODIFY
    // We handle errors on these in case they are already uppercase or mismatch
    const statuses = ['pending', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];
    for (const s of statuses) {
      await pool.query("UPDATE orders SET status = ? WHERE status = ?", [s.toUpperCase(), s]);
    }
    
    // Now expand the enum to include all required states in UPPERCASE
    const newEnum = "'PENDING', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'PAID'";
    await pool.query(`ALTER TABLE orders MODIFY COLUMN status ENUM(${newEnum}) DEFAULT 'PENDING'`);
    
    console.log("Successfully updated orders status enum to uppercase and included READY.");
    
    // Verify
    const [rows] = await pool.query("DESCRIBE orders");
    const statusCol = rows.find(r => r.Field === 'status');
    console.log("NEW STATUS COLUMN TYPE:", statusCol.Type);
    
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    process.exit(0);
  }
}
migrate();
