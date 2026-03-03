const bcrypt = require("bcryptjs");
const pool = require("../../config/db");

const DEMO_USERS = [
  {
    name: "Admin User",
    email: "admin@qrave.com",
    password: "password123",
    role: "admin",
  },
  {
    name: "Manager User",
    email: "manager@qrave.com",
    password: "password123",
    role: "manager",
  },
  {
    name: "John Doe",
    email: "user@qrave.com",
    password: "password123",
    role: "user",
  },
];

async function seed() {
  console.log("🌱 Seeding demo users...");
  for (const u of DEMO_USERS) {
    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [u.email],
    );
    if (existing.length) {
      console.log(`  ⏭️  ${u.email} already exists, skipping`);
      continue;
    }
    const hashed = await bcrypt.hash(u.password, 10);
    await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [u.name, u.email, hashed, u.role],
    );
    console.log(`  ✅ ${u.role}: ${u.email}`);
  }
  console.log("🌱 Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
