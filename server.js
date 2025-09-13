const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "sih27",
});

db.connect((err) => {
  if (err) return console.error("❌ MySQL connection failed:", err);
  console.log("✅ Connected to MySQL database");
});

// Test route
app.get("/test", (req, res) => {
  res.send("Hello from Express + MySQL!");
});

// ✅ Get admin counts
app.get("/api/admins/count", async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT 
        SUM(CASE WHEN status = 'ACTIVE' THEN 1 ELSE 0 END) AS active,
        SUM(CASE WHEN status = 'SUSPENDED' THEN 1 ELSE 0 END) AS suspended
      FROM admins;
    `);

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching counts:", err);
    res.status(500).json({ error: "Failed to fetch counts" });
  }
});

// get admins
app.get("/api/admins", async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT 
        AdminID AS id,
        AdminName AS name,
        AdminPhone AS phone,
        ARole AS role,
        District AS district,
        status,
        NOW() AS lastLogin -- 👈 for now fake last login
      FROM admins;
    `);

    res.json(rows);
  } catch (err) {
    console.error("Error fetching admins:", err);
    res.status(500).json({ error: "Failed to fetch admins" });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});