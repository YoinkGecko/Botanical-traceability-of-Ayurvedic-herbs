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


// Create new admin
app.post("/api/admins", async (req, res) => {
  try {
    const { AdminName, AdminPhone, APass, ARole, District } = req.body;

    if (!AdminName || !AdminPhone || !APass || !ARole || !District) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const [result] = await db
      .promise()
      .query(
        `INSERT INTO admins (AdminName, AdminPhone, APass, ARole, District, status)
         VALUES (?, ?, ?, ?, ?, 'ACTIVE')`,
        [AdminName, AdminPhone, APass, ARole, District]
      );

    res.status(201).json({ id: result.insertId, message: "Admin created" });
  } catch (err) {
    console.error("Error creating admin:", err);
    res.status(500).json({ error: "Failed to create admin" });
  }
});

// Login route
app.post("/api/admins/login", async (req, res) => {
  const { phonenumber, password } = req.body; // 👈 changed here

  try {
    const [rows] = await db
      .promise()
      .query(
        "SELECT AdminID, AdminName, APass, status FROM admins WHERE AdminPhone = ?",
        [phonenumber]   // 👈 changed here
      );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const admin = rows[0];

    if (admin.status === "SUSPENDED") {
      return res
        .status(403)
        .json({ error: "Account suspended. Contact MOA." });
    }

    if (admin.APass !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({
      success: true,
      message: "Login successful",
      admin: { id: admin.AdminID, name: admin.AdminName },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


app.get("/api/dashboard/kpis", async (req, res) => {
  try {
    const { district } = req.query;

    if (!district) {
      return res.status(400).json({ error: "District is required" });
    }

    const [[farmerCount]] = await db
      .promise()
      .query("SELECT COUNT(*) AS count FROM farmers WHERE District = ?", [district]);

    const [[labTesterCount]] = await db
      .promise()
      .query("SELECT COUNT(*) AS count FROM labtesters WHERE District = ?", [district]);

    const [[processorCount]] = await db
      .promise()
      .query("SELECT COUNT(*) AS count FROM processors WHERE District = ?", [district]);

    const [[manufacturerCount]] = await db
      .promise()
      .query("SELECT COUNT(*) AS count FROM manufacturers WHERE District = ?", [district]);

    res.json({
      farmers: farmerCount.count,
      labTesters: labTesterCount.count,
      processors: processorCount.count,
      manufacturers: manufacturerCount.count,
    });
  } catch (err) {
    console.error("Error fetching dashboard KPIs:", err);
    res.status(500).json({ error: "Failed to fetch KPI counts" });
  }
});


app.get("/api/dashboard/funneldata", async (req, res) => {
  try {
    const { district } = req.query;

    const [[{ count: farmerSubmissions }]] = await db
      .promise()
      .query(
        "SELECT COUNT(*) AS count FROM farmer_data_collection WHERE District = ?",
        [district]
      );

    const [[{ count: processorSubmissions }]] = await db
      .promise()
      .query(
        "SELECT COUNT(*) AS count FROM processor_data_collection WHERE District = ?",
        [district]
      );

    const [[{ count: labTesterSubmissions }]] = await db
      .promise()
      .query(
        "SELECT COUNT(*) AS count FROM labtester_data_collection WHERE District = ?",
        [district]
      );

    const [[{ count: manufacturerSubmissions }]] = await db
      .promise()
      .query(
        "SELECT COUNT(*) AS count FROM manufacturer_data_collection WHERE District = ?",
        [district]
      );

    const totalSubmissions =
      farmerSubmissions +
      processorSubmissions +
      labTesterSubmissions +
      manufacturerSubmissions;

    // Count labTesting → with status filter
    const [[{ count: labTesting }]] = await db
      .promise()
      .query(
        "SELECT COUNT(*) AS count FROM labtester_data_collection WHERE District = ?",
        [district]
      );

    // Count Processing → status not rejected
    const [[{ count: processing }]] = await db
      .promise()
      .query(
        "SELECT COUNT(*) AS count FROM processor_data_collection WHERE District = ?",
        [district]
      );

    // Count Approved → manufacturer approved
    const [[{ count: approved }]] = await db
      .promise()
      .query(
        "SELECT COUNT(*) AS count FROM manufacturer_data_collection WHERE District = ?",
        [district]
      );

    res.json({
      Submissions: totalSubmissions,
      labTesting,
      Processing: processing,
      Approved: approved,
    });
  } catch (err) {
    console.error("Error fetching funnel data:", err);
    res.status(500).json({ error: "Failed to fetch funnel data" });
  }
});


app.post("/api/farmers", async (req, res) => {
  try {
    const { FarmerName, FarmerPhone, District, Password } = req.body;
    if (!FarmerName || !FarmerPhone || !District || !Password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const [result] = await db
      .promise()
      .query(
        "INSERT INTO farmers (FarmerName, FarmerPhone, District, Password) VALUES (?, ?, ?, ?)",
        [FarmerName, FarmerPhone, District, Password]
      );

    res.status(201).json({ id: result.insertId, message: "Farmer registered successfully" });
  } catch (err) {
    console.error("Error creating farmer:", err);
    res.status(500).json({ error: "Failed to register farmer" });
  }
});

// ================================
// Processor Registration
// ================================
app.post("/api/processors", async (req, res) => {
  try {
    const { ProcessorName, ProcessorPhone, District, LicenseNo, Password } = req.body;
    if (!ProcessorName || !ProcessorPhone || !District || !Password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const [result] = await db
      .promise()
      .query(
        "INSERT INTO processors (ProcessorName, ProcessorPhone, District, LicenseNo, Password) VALUES (?, ?, ?, ?, ?)",
        [ProcessorName, ProcessorPhone, District, LicenseNo || null, Password]
      );

    res.status(201).json({ id: result.insertId, message: "Processor registered successfully" });
  } catch (err) {
    console.error("Error creating processor:", err);
    res.status(500).json({ error: "Failed to register processor" });
  }
});

// ================================
// Lab Tester Registration
// ================================
app.post("/api/labtesters", async (req, res) => {
  try {
    const { LabTesterName, LabTesterPhone, District, AccreditationNo, Password } = req.body;
    if (!LabTesterName || !LabTesterPhone || !District || !Password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const [result] = await db
      .promise()
      .query(
        "INSERT INTO labtesters (LabTesterName, LabTesterPhone, District, AccreditationNo, Password) VALUES (?, ?, ?, ?, ?)",
        [LabTesterName, LabTesterPhone, District, AccreditationNo || null, Password]
      );

    res.status(201).json({ id: result.insertId, message: "Lab Tester registered successfully" });
  } catch (err) {
    console.error("Error creating labtester:", err);
    res.status(500).json({ error: "Failed to register labtester" });
  }
});

// ================================
// Manufacturer Registration
// ================================
app.post("/api/manufacturers", async (req, res) => {
  try {
    const { ManufacturerName, ManufacturerPhone, District, LicenseNo, Password } = req.body;
    if (!ManufacturerName || !ManufacturerPhone || !District || !Password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const [result] = await db
      .promise()
      .query(
        "INSERT INTO manufacturers (ManufacturerName, ManufacturerPhone, District, LicenseNo, Password) VALUES (?, ?, ?, ?, ?)",
        [ManufacturerName, ManufacturerPhone, District, LicenseNo || null, Password]
      );

    res.status(201).json({ id: result.insertId, message: "Manufacturer registered successfully" });
  } catch (err) {
    console.error("Error creating manufacturer:", err);
    res.status(500).json({ error: "Failed to register manufacturer" });
  }
});

// Get Admin District by Phone
app.get("/api/admin/district/:phone", async (req, res) => {
  try {
    const phone = req.params.phone;

    const [rows] = await db.promise().query(
      "SELECT District FROM admins WHERE AdminPhone = ? LIMIT 1",
      [phone]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.json({ district: rows[0].District });
  } catch (err) {
    console.error("Error fetching admin district:", err);
    res.status(500).json({ error: "Server error" });
  }
});


app.get("/api/admin/getphanddistrict", (req, res) => {
  const { phone } = req.query;

  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  const query = "SELECT AdminName AS name, District AS district FROM admins WHERE AdminPhone = ?";
  
  db.query(query, [phone], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.json(results[0]); 
  });
});

// ✅ Recent Submissions Route
// ✅ Recent Submissions Route (fixed for mysql2)
app.get("/api/admin/dashboard/recentsubmissions", async (req, res) => {
  try {
    const { district } = req.query;

    const [rows] = await db
      .promise()
      .query(
        `
        SELECT * FROM (
          SELECT 
            fdc.FbatchID AS id,
            CONCAT('FARM-', fdc.FbatchID) AS submissionId,
            f.FarmerName AS stakeholderName,
            'Farmer' AS stakeholderType,
            fdc.TypeOfHerb AS submissionType,
            fdc.Status AS status,
            fdc.Timestamp AS timestamp
          FROM farmer_data_collection fdc
          JOIN farmers f ON f.FarmerID = fdc.Fid
          WHERE fdc.District = ?
          ORDER BY fdc.Timestamp DESC
           
        ) farmer

        UNION ALL

        SELECT * FROM (
          SELECT 
            pdc.PbatchID AS id,
            CONCAT('PROC-', pdc.PbatchID) AS submissionId,
            p.ProcessorName AS stakeholderName,
            'Processor' AS stakeholderType,
            pdc.ProcessingStep AS submissionType,
            pdc.Status AS status,
            pdc.Timestamp AS timestamp
          FROM processor_data_collection pdc
          JOIN processors p ON p.ProcessorID = pdc.Pid
          WHERE pdc.District = ?
          ORDER BY pdc.Timestamp DESC
           
        ) processor

        UNION ALL

        SELECT * FROM (
          SELECT 
            ldc.LbatchID AS id,
            CONCAT('LAB-', ldc.LbatchID) AS submissionId,
            l.LabTesterName AS stakeholderName,
            'Lab Tester' AS stakeholderType,
            ldc.TestType AS submissionType,
            ldc.Status AS status,
            ldc.Timestamp AS timestamp
          FROM labtester_data_collection ldc
          JOIN labtesters l ON l.LabTesterID = ldc.LabID
          WHERE ldc.District = ?
          ORDER BY ldc.Timestamp DESC
           
        ) lab

        UNION ALL

        SELECT * FROM (
          SELECT 
            mdc.MbatchID AS id,
            CONCAT('MFG-', mdc.MbatchID) AS submissionId,
            m.ManufacturerName AS stakeholderName,
            'Manufacturer' AS stakeholderType,
            mdc.ProductName AS submissionType,
            mdc.Status AS status,
            mdc.Timestamp AS timestamp
          FROM manufacturer_data_collection mdc
          JOIN manufacturers m ON m.ManufacturerID = mdc.ManufacturerID
          WHERE mdc.District = ?
          ORDER BY mdc.Timestamp DESC
           
        ) manufacturer

        ORDER BY timestamp DESC
        `,
        [district, district, district, district]
      );

    res.json(rows);
  } catch (err) {
    console.error("❌ Query failed:", err);
    res.status(500).json({ error: "Failed to fetch recent submissions" });
  }
});
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});