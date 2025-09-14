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


app.put("/api/admins/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["ACTIVE", "SUSPENDED"].includes(status?.toUpperCase())) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const [result] = await db
      .promise()
      .query("UPDATE admins SET status = ? WHERE AdminID = ?", [
        status.toUpperCase(),
        id,
      ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.json({
      success: true,
      message: `Admin status updated to ${status.toUpperCase()}`,
    });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
});

// ======================
// Delete admin
// ======================
app.delete("/api/admins/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db
      .promise()
      .query("DELETE FROM admins WHERE AdminID = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.json({ success: true, message: "Admin deleted successfully" });
  } catch (err) {
    console.error("Error deleting admin:", err);
    res.status(500).json({ error: "Failed to delete admin" });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});