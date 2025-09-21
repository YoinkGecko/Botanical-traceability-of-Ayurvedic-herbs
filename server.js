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

    // Farmer submissions
    const [[{ count: farmerSubmissions }]] = await db.promise().query(
      "SELECT COUNT(*) AS count FROM farmer_data_collection WHERE District = ?",
      [district]
    );

    // Processor submissions
    const [[{ count: processorSubmissions }]] = await db.promise().query(
      "SELECT COUNT(*) AS count FROM processor_data_collection WHERE District = ?",
      [district]
    );

    // Lab tester submissions
    const [[{ count: labTesterSubmissions }]] = await db.promise().query(
      "SELECT COUNT(*) AS count FROM labtester_data_collection WHERE District = ?",
      [district]
    );

    // Manufacturer submissions
    const [[{ count: manufacturerSubmissions }]] = await db.promise().query(
      "SELECT COUNT(*) AS count FROM manufacturer_data_collection WHERE District = ?",
      [district]
    );

    // Total submissions across all roles
    const totalSubmissions =
      farmerSubmissions +
      processorSubmissions +
      labTesterSubmissions +
      manufacturerSubmissions;

    // Lab Testing stage (example: still in progress)
    const [[{ count: labTesting }]] = await db.promise().query(
      "SELECT COUNT(*) AS count FROM labtester_data_collection WHERE District = ? ",
      [district]
    );

    // Processing stage (not rejected)
    const [[{ count: processing }]] = await db.promise().query(
      "SELECT COUNT(*) AS count FROM processor_data_collection WHERE District = ? AND status != 'REJECTED'",
      [district]
    );

    // Approved stage → sum of approved across all 4 tables
    const [[{ count: farmerApproved }]] = await db.promise().query(
      "SELECT COUNT(*) AS count FROM farmer_data_collection WHERE District = ? AND status = 'APPROVED'",
      [district]
    );

    const [[{ count: processorApproved }]] = await db.promise().query(
      "SELECT COUNT(*) AS count FROM processor_data_collection WHERE District = ? AND status = 'APPROVED'",
      [district]
    );

    const [[{ count: labTesterApproved }]] = await db.promise().query(
      "SELECT COUNT(*) AS count FROM labtester_data_collection WHERE District = ? AND status = 'APPROVED'",
      [district]
    );

    const [[{ count: manufacturerApproved }]] = await db.promise().query(
      "SELECT COUNT(*) AS count FROM manufacturer_data_collection WHERE District = ? AND status = 'APPROVED'",
      [district]
    );

    const totalApproved =
      farmerApproved + processorApproved + labTesterApproved + manufacturerApproved;

        // Approved stage → sum of approved across all 4 tables
    const [[{ count: farmerre }]] = await db.promise().query(
      "SELECT COUNT(*) AS count FROM farmer_data_collection WHERE District = ? AND status = 'REJECTED'",
      [district]
    );

    const [[{ count: processorre }]] = await db.promise().query(
      "SELECT COUNT(*) AS count FROM processor_data_collection WHERE District = ? AND status = 'REJECTED'",
      [district]
    );

    const [[{ count: labTesterre }]] = await db.promise().query(
      "SELECT COUNT(*) AS count FROM labtester_data_collection WHERE District = ? AND status = 'REJECTED'",
      [district]
    );

    const [[{ count: manufacturerre }]] = await db.promise().query(
      "SELECT COUNT(*) AS count FROM manufacturer_data_collection WHERE District = ? AND status = 'REJECTED'",
      [district]
    );

    const totalrej =
      farmerre + processorre + labTesterre + manufacturerre;

        const [[{ count: farmer }]] = await db.promise().query(
      "SELECT COUNT(*) AS count FROM farmer_data_collection WHERE District = ?",
      [district]
    );

    const [[{ count: manu }]] = await db.promise().query(
      "SELECT COUNT(*) AS count FROM manufacturer_data_collection WHERE District = ? ",
      [district]
    );

    // Send final response
    res.json({
      Submissions: totalSubmissions,
      farmer,
      labTesting,
      Processing: processing,
      man:manu,
      Approved: totalApproved,
      Rejected:totalrej
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

app.get("/api/admin/dashboard/submission/:submissionId", async (req, res) => {
  try {
    const { submissionId } = req.params;
    const [prefix, id] = submissionId.split("-"); // e.g., PROC-4 -> ['PROC', '4']

    let query = "";
    let params = [id];

    switch (prefix) {
      case "FARM":
        query = `
          SELECT fdc.*, f.FarmerName, f.FarmerPhone,
                 a.AdminName AS approvedByName, a.ARole AS approvedByRole
          FROM farmer_data_collection fdc
          JOIN farmers f ON f.FarmerID = fdc.Fid
          LEFT JOIN admins a ON fdc.ApprovedBy = a.AdminID
          WHERE fdc.FbatchID = ?
        `;
        break;

      case "PROC":
        query = `
          SELECT pdc.*, p.ProcessorName, p.ProcessorPhone,
                 ff.TypeOfHerb AS linkedFarmerHerb, ff.FbatchID AS linkedFarmerBatchID, ff.Quantity AS linkedFarmerQuantity,
                 fa.FarmerName AS linkedFarmerName,
                 a.AdminName AS approvedByName, a.ARole AS approvedByRole
          FROM processor_data_collection pdc
          JOIN processors p ON p.ProcessorID = pdc.Pid
          LEFT JOIN farmer_data_collection ff ON ff.FbatchID = pdc.LinkedFarmerBatchID
          LEFT JOIN farmers fa ON fa.FarmerID = ff.Fid
          LEFT JOIN admins a ON pdc.ApprovedBy = a.AdminID
          WHERE pdc.PbatchID = ?
        `;
        break;

      case "LAB":
        query = `
          SELECT ldc.*, l.LabTesterName, l.LabTesterPhone,
                 pc.ProcessingStep AS linkedProcessorStep, pc.PbatchID AS linkedProcessorBatchID,
                 pr.ProcessorName AS linkedProcessorName,
                 a.AdminName AS approvedByName, a.ARole AS approvedByRole
          FROM labtester_data_collection ldc
          JOIN labtesters l ON l.LabTesterID = ldc.LabID
          LEFT JOIN processor_data_collection pc ON pc.PbatchID = ldc.LinkedBatchID
          LEFT JOIN processors pr ON pr.ProcessorID = pc.Pid
          LEFT JOIN admins a ON ldc.ApprovedBy = a.AdminID
          WHERE ldc.LbatchID = ?
        `;
        break;

      case "MFG":
        query = `
          SELECT 
    mdc.*, 
    m.ManufacturerName, 
    m.ManufacturerPhone,
    a.AdminName AS approvedByName, 
    a.ARole AS approvedByRole,
    GROUP_CONCAT(ll.LbatchID) AS linkedLabBatchIDs,
    GROUP_CONCAT(l.LabTesterName) AS linkedLabTesterNames
FROM manufacturer_data_collection mdc
JOIN manufacturers m ON m.ManufacturerID = mdc.ManufacturerID
LEFT JOIN admins a ON mdc.ApprovedBy = a.AdminID
LEFT JOIN manufacturer_labtester_link ll ON ll.MbatchID = mdc.MbatchID
LEFT JOIN labtester_data_collection ldc ON ldc.LbatchID = ll.LbatchID
LEFT JOIN labtesters l ON l.LabTesterID = ldc.LabID
WHERE mdc.MbatchID = ?
GROUP BY mdc.MbatchID
        `;
        break;

      default:
        return res.status(400).json({ error: "Invalid submission ID" });
    }

    const [rows] = await db.promise().query(query, params);
    if (!rows.length) return res.status(404).json({ error: "Submission not found" });

    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Fetch submission details failed:", err);
    res.status(500).json({ error: "Failed to fetch submission details" });
  }
});

// ===== Farmers =====
app.get("/api/farmers", (req, res) => {
  const query = `
    SELECT f.FarmerID AS id, f.FarmerName AS name, f.FarmerPhone AS phone,
           d.TypeOfHerb, d.Quantity, d.Location, d.Status, d.Timestamp
    FROM farmers f
    LEFT JOIN farmer_data_collection d ON f.FarmerID = d.Fid
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Farmers fetch error:", err);
      return res.status(500).json({ error: "DB error" });
    }
    console.log("✅ Farmers results:", results); 
    res.json(results);
  });
});

// ===== Lab Testers =====
app.get("/api/lab-testers", (req, res) => {
  const query = `
    SELECT l.LabTesterID AS id, l.LabTesterName AS name, l.LabTesterPhone AS phone,
           d.TestType, d.TestResults, d.PassFailStatus, d.Status, d.Timestamp
    FROM labtesters l
    LEFT JOIN labtester_data_collection d ON l.LabTesterID = d.LabID
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ LabTesters fetch error:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json(results);
    console.log("✅ labtester results:", results); 
  });
});

// ===== Processors =====
app.get("/api/processors", (req, res) => {
  const query = `
    SELECT p.ProcessorID AS id, p.ProcessorName AS name, p.ProcessorPhone AS phone,
           d.ProcessingStep, d.WeightAfterProcessing, d.Location, d.Status, d.Timestamp
    FROM processors p
    LEFT JOIN processor_data_collection d ON p.ProcessorID = d.Pid
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Processors fetch error:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json(results);
    console.log("✅ processor results:", results); 
  });
});

// ===== Manufacturers =====
app.get("/api/manufacturers", (req, res) => {
  const query = `
    SELECT m.ManufacturerID AS id, m.ManufacturerName AS name, m.ManufacturerPhone AS phone,
           d.ProductName, d.ProductForm, d.WeightFinal, d.Status, d.Timestamp
    FROM manufacturers m
    LEFT JOIN manufacturer_data_collection d ON m.ManufacturerID = d.ManufacturerID
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Manufacturers fetch error:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json(results);
    console.log("✅ manu results:", results); 
  });
});



// 1️⃣ Farmers
app.get("/api/farmer-data", (req, res) => {
  db.query("SELECT * FROM farmer_data_collection where Status != 'APPROVED'", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 2️⃣ Processor data
app.get("/api/processor-data", (req, res) => {
  db.query("SELECT * FROM processor_data_collection where Status != 'APPROVED'", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 3️⃣ Lab tester data
app.get("/api/labtester-data", (req, res) => {
  db.query("SELECT * FROM labtester_data_collection where Status != 'APPROVED'", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 4️⃣ Manufacturer data
app.get("/api/manufacturer-data", (req, res) => {
  db.query("SELECT * FROM manufacturer_data_collection where Status != 'APPROVED' ", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


app.post("/api/:table/:id/approve", (req, res) => {
  const { table, id } = req.params;
  const tableMap = {
    farmers: "farmer_data_collection",
    processors: "processor_data_collection",
    "lab-testers": "labtester_data_collection",
    manufacturers: "manufacturer_data_collection",
  };
  const tableName = tableMap[table];
  if (!tableName) return res.status(400).json({ error: "Invalid table" });

  db.query(
    `UPDATE ${tableName} SET Status='APPROVED' WHERE ${tableName.slice(0, 1).toUpperCase() + tableName.slice(1, 2)}batchID=?`,
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: "Approved" });
    }
  );
});

app.post("/api/:table/:id/reject", (req, res) => {
  const { table, id } = req.params;
  const tableMap = {
    farmers: "farmer_data_collection",
    processors: "processor_data_collection",
    "lab-testers": "labtester_data_collection",
    manufacturers: "manufacturer_data_collection",
  };
  const tableName = tableMap[table];
  if (!tableName) return res.status(400).json({ error: "Invalid table" });

  db.query(
    `UPDATE ${tableName} SET Status='REJECTED' WHERE ${tableName.slice(0, 1).toUpperCase() + tableName.slice(1, 2)}batchID=?`,
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: "Rejected" });
    }
  );
});

// Approve route with transactional BC integration (callback style)
app.post("/api/stakeholders/approve", (req, res) => {
  const { batchId, activeTab, adminPhone } = req.body;

  const tableMap = {
    farmers: { table: "farmer_data_collection", idField: "FbatchID" },
    processors: { table: "processor_data_collection", idField: "PbatchID" },
    "lab-testers": { table: "labtester_data_collection", idField: "LbatchID" },
    "labtesters": { table: "labtester_data_collection", idField: "LbatchID" },
    "lab_testers": { table: "labtester_data_collection", idField: "LbatchID" },
    manufacturers: { table: "manufacturer_data_collection", idField: "MbatchID" },
  };

  const key = activeTab.toLowerCase().replace(/\s+/g, "-");
  const mapping = tableMap[key];
  if (!mapping) return res.status(400).json({ error: "Invalid stakeholder type" });

  // Step 1: get AdminID
  db.query(
    "SELECT AdminID FROM admins WHERE AdminPhone=? AND status='ACTIVE'",
    [adminPhone],
    (err, admins) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (!admins.length) return res.status(401).json({ error: "Unauthorized: Admin not found or inactive" });

      const adminId = admins[0].AdminID;

      // Step 2: start transaction
      db.beginTransaction((errTrans) => {
        if (errTrans) return res.status(500).json({ error: "Transaction start failed" });

        // Step 3: update batch
        const sqlUpdate = `UPDATE ${mapping.table} SET Status='APPROVED', ApprovedBy=? WHERE ${mapping.idField}=?`;
        db.query(sqlUpdate, [adminId, batchId], (err2, result) => {
          if (err2) return db.rollback(() => res.status(500).json({ error: "Database error on update" }));
          if (result.affectedRows === 0) return db.rollback(() => res.status(404).json({ error: "Batch not found" }));

          // Step 4: fetch updated row
          const sqlSelect = `SELECT * FROM ${mapping.table} WHERE ${mapping.idField}=?`;
          db.query(sqlSelect, [batchId], (err3, rows) => {
            if (err3) return db.rollback(() => res.status(500).json({ error: "Database error on select" }));
            if (!rows.length) return db.rollback(() => res.status(404).json({ error: "Row not found" }));

            const approvedRow = rows[0];
            approvedRow.role = key;

            // Step 5: send to BC server
            fetch("http://localhost:3000/add", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ data: approvedRow }),
            })
              .then((bcRes) => {
                if (!bcRes.ok) throw new Error("Blockchain server failed");

                // Step 6: commit transaction
                db.commit((errCommit) => {
                  if (errCommit) return db.rollback(() => res.status(500).json({ error: "Commit failed" }));

                  res.json({
                    success: true,
                    message: `${key} batch ${batchId} approved & added to blockchain`,
                  });
                });
              })
              .catch((bcErr) => {
                db.rollback(() => {
                  console.error(bcErr);
                  res.status(500).json({ error: "Blockchain push failed, transaction rolled back" });
                });
              });
          });
        });
      });
    }
  );
});

// Reject route
app.post("/api/stakeholders/reject", (req, res) => {
  const { batchId, activeTab, adminPhone } = req.body;

  const tableMap = {
    farmers: { table: "farmer_data_collection", idField: "FbatchID" },
    processors: { table: "processor_data_collection", idField: "PbatchID" },
    "lab-testers": { table: "labtester_data_collection", idField: "LbatchID" },
    "labtesters": { table: "labtester_data_collection", idField: "LbatchID" },
    "lab_testers": { table: "labtester_data_collection", idField: "LbatchID" },
    manufacturers: { table: "manufacturer_data_collection", idField: "MbatchID" },
  };

  const key = activeTab.toLowerCase().replace(/\s+/g, "-");
  const mapping = tableMap[key];

  if (!mapping) return res.status(400).json({ error: "Invalid stakeholder type" });

  db.query(
    "SELECT AdminID FROM admins WHERE AdminPhone=? AND status='ACTIVE'",
    [adminPhone],
    (err, admins) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (!admins.length) return res.status(401).json({ error: "Unauthorized: Admin not found or inactive" });

      const adminId = admins[0].AdminID;

      const sql = `UPDATE ${mapping.table} SET Status='REJECTED', ApprovedBy=? WHERE ${mapping.idField}=?`;

      db.query(sql, [adminId, batchId], (err2, result) => {
        if (err2) return res.status(500).json({ error: "Database error" });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Batch not found" });

        res.json({ success: true, message: `${key} batch ${batchId} rejected by Admin ${adminId}` });
      });
    }
  );
});


// =============================
// MAP LOCATIONS ROUTE
// =============================
// =============================
// MAP LOCATIONS ROUTE
// =============================
app.get("/api/map-locations", (req, res) => {
  const { district } = req.query;

  if (!district) {
    return res.status(400).json({ error: "District required" });
  }

  try {
    // Farmer data
    db.query(
      "SELECT FbatchID AS batchId, Location, District, Quantity, 'farmer' AS type FROM farmer_data_collection WHERE District = ?",
      [district],
      (err, farmers) => {
        if (err) {
          console.error("Error fetching farmers:", err);
          return res.status(500).json({ error: "Server error" });
        }

        // Processor data
        db.query(
          "SELECT PbatchID AS batchId, Location, District, ProcessingStep AS processStep, 'processor' AS type FROM processor_data_collection WHERE District = ?",
          [district],
          (err, processors) => {
            if (err) {
              console.error("Error fetching processors:", err);
              return res.status(500).json({ error: "Server error" });
            }

            // Lab data
            db.query(
              "SELECT LbatchID AS batchId, Location, District, TestResults AS testResult, 'lab' AS type FROM labtester_data_collection WHERE District = ?",
              [district],
              (err, labs) => {
                if (err) {
                  console.error("Error fetching labs:", err);
                  return res.status(500).json({ error: "Server error" });
                }

                // Manufacturer data
                db.query(
                  "SELECT MbatchID AS batchId, Location, District, ProductName, 'manufacturer' AS type FROM manufacturer_data_collection WHERE District = ?",
                  [district],
                  (err, manufacturers) => {
                    if (err) {
                      console.error("Error fetching manufacturers:", err);
                      return res.status(500).json({ error: "Server error" });
                    }

                    // Merge & format
                    const all = [
                      ...farmers,
                      ...processors,
                      ...labs,
                      ...manufacturers,
                    ].map((row) => {
                      let message = "";
                      if (row.type === "farmer") {
                        message = `👨‍🌾 Farmer Batch: ${row.batchId} | Qty: ${row.Quantity}`;
                      } else if (row.type === "processor") {
                        message = `🏭 Processor Batch: ${row.batchId} | Step: ${row.processStep}`;
                      } else if (row.type === "lab") {
                        message = `🧪 Lab Batch: ${row.batchId} | Result: ${row.testResult}`;
                      } else if (row.type === "manufacturer") {
                        message = `🏢 Manufacturer Batch: ${row.batchId} | Product: ${row.ProductName}`;
                      }

                      return {
                        type: row.type,
                        batchId: row.batchId,
                        location: row.Location,
                        district: row.District,
                        message,
                      };
                    });

                    res.json(all);
                  }
                );
              }
            );
          }
        );
      }
    );
  } catch (err) {
    console.error("❌ Error in map locations route:", err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});