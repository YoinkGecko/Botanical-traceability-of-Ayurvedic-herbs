// bcserver.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // allow all origins

// Paths
// Paths
const chainFile = "/Users/kartikeyasharma/Desktop/sih_2025/sih27/chain/chain.json";
const backupDir = "/Users/kartikeyasharma/Desktop/sih_2025/sih27/chain/backup";

// ----------------- IST Timestamp Helpers -----------------
function getISTTimestamp() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000; // convert to UTC
  const istOffset = 5.5 * 60 * 60000; // 5:30 in ms
  const ist = new Date(utc + istOffset);
  const yyyy = ist.getFullYear();
  const mm = String(ist.getMonth() + 1).padStart(2, "0");
  const dd = String(ist.getDate()).padStart(2, "0");
  const hh = String(ist.getHours()).padStart(2, "0");
  const min = String(ist.getMinutes()).padStart(2, "0");
  const ss = String(ist.getSeconds()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

function getISTFilenameTimestamp() {
  return getISTTimestamp().replace(/[-: ]/g, "_");
}

// ----------------- Blockchain Helpers -----------------
function calculateHash(data, previousHash, timestamp) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(data) + previousHash + timestamp)
    .digest("hex");
}

function createGenesisBlock() {
  const timestamp = Date.now();
  return {
    index: 1,
    timestamp,
    data: "Genesis Block",
    previousHash: "0",
    hash: calculateHash("Genesis Block", "0", timestamp),
  };
}

function saveChain(chain) {
  fs.writeFileSync(chainFile, JSON.stringify(chain, null, 2));

  // Timestamped backup
  const backupFile = path.join(backupDir, `chain_backup_${getISTFilenameTimestamp()}.json`);
  fs.writeFileSync(backupFile, JSON.stringify(chain, null, 2));
  console.log(`✅ [${getISTTimestamp()}] Blockchain saved. Backup created: ${backupFile} `);
}

function loadChain() {
  // chain.json exists → load normally
  if (fs.existsSync(chainFile)) {
    return JSON.parse(fs.readFileSync(chainFile));
  }

  // chain.json missing → check for latest backup
  const backups = fs.readdirSync(backupDir)
    .filter(f => f.startsWith("chain_backup_") && f.endsWith(".json"))
    .sort();

  if (backups.length) {
    const latestBackup = backups[backups.length - 1];
    const backupData = JSON.parse(fs.readFileSync(path.join(backupDir, latestBackup)));
    fs.writeFileSync(chainFile, JSON.stringify(backupData, null, 2));
    console.log(`✅ [${getISTTimestamp()}] chain.json restored from backup: ${latestBackup} `);
    return backupData;
  }

  // No chain.json & no backup → create Genesis block
  const genesisBlock = createGenesisBlock();
  saveChain([genesisBlock]);
  console.log(`⚠️ [${getISTTimestamp()}] No backup found → chain.json created with Genesis Block `);
  return [genesisBlock];
}

function verifyChain(chain) {
  for (let i = 1; i < chain.length; i++) {
    const block = chain[i];
    const prevBlock = chain[i - 1];
    const recalculatedHash = calculateHash(block.data, block.previousHash, block.timestamp);
    if (block.previousHash !== prevBlock.hash || block.hash !== recalculatedHash) {
      return i; // first invalid block index
    }
  }
  return -1; // valid chain
}

// ----------------- Routes -----------------
app.post("/add", (req, res) => {
  const { data } = req.body;
  if (!data) return res.status(400).send("Data is required!");

  let chain = loadChain();
  const invalidIndex = verifyChain(chain);
  if (invalidIndex !== -1) {
    console.warn(`⚠️ [${getISTTimestamp()}] Chain invalid at block ${invalidIndex + 1}! Restoring from latest backup...`);
    const backups = fs.readdirSync(backupDir)
      .filter(f => f.startsWith("chain_backup_") && f.endsWith(".json"))
      .sort();
    if (backups.length) {
      const latestBackup = backups[backups.length - 1];
      chain = JSON.parse(fs.readFileSync(path.join(backupDir, latestBackup)));
      saveChain(chain);
      console.log(`✅ [${getISTTimestamp()}] Blockchain restored from backup: ${latestBackup} `);
    } else {
      console.error("❌ No backup found! Manual intervention required.");
    }
  }

  const previousHash = chain[chain.length - 1].hash;
  const timestamp = Date.now();
  const block = {
    index: chain.length + 1,
    timestamp,
    data,
    previousHash,
    hash: calculateHash(data, previousHash, timestamp),
  };

  chain.push(block);
  saveChain(chain);
  res.send({ message: "Block added!", block });
});

app.get("/block/:id", (req, res) => {
  const chain = loadChain();
  const block = chain.find(b => b.index === parseInt(req.params.id));
  if (!block) return res.status(404).send("Block not found!");
  res.json(block);
});

app.get("/chain", (req, res) => res.json(loadChain()));

app.get("/verify", (req, res) => {
  const chain = loadChain();
  const invalidIndex = verifyChain(chain);
  res.json({ valid: invalidIndex === -1, invalidBlock: invalidIndex !== -1 ? invalidIndex + 1 : null });
});

app.get("/count", (req, res) => {
  const chain = loadChain();
  res.json({ totalBlocks: chain.length });
});

// ----------------- Tamper Detection & Auto-Restore -----------------
setInterval(() => {
  const chain = loadChain();
  const invalidIndex = verifyChain(chain);
  const now = getISTTimestamp();

  if (invalidIndex !== -1) {
    console.error(`⚠️ [${now}] Tamper detected at block ${invalidIndex + 1}! Restoring from latest backup...`);
    const backups = fs.readdirSync(backupDir)
      .filter(f => f.startsWith("chain_backup_") && f.endsWith(".json"))
      .sort();
    if (backups.length) {
      const latestBackup = backups[backups.length - 1];
      fs.copyFileSync(path.join(backupDir, latestBackup), chainFile);
      console.log(`✅ [${now}] Blockchain restored from backup: ${latestBackup} `);
    } else {
      console.error("❌ No backup found! Manual intervention required.");
    }
  } else {
    console.log(`✅ [${now}] Blockchain valid `);
  }
}, 5000);
// bcserver.js
let logLines = []; // runtime logs

// Override console.log to capture logs
const origLog = console.log;
console.log = (...args) => {
  const msg = `[${getISTTimestamp()}] ${args.join(" ")} `;
  logLines.push(msg);
  if (logLines.length > 200) logLines.shift();
  origLog(...args);
};
const origError = console.error;
console.error = (...args) => {
  const msg = `[${getISTTimestamp()}] ${args.join(" ")} `;
  logLines.push(msg);
  if (logLines.length > 5000) logLines.shift(); // optional: bada limit
  origError(...args);
};

// Endpoint to fetch logs
app.get("/logs", (req, res) => {
  res.json(logLines);
});
// ----------------- Server Start -----------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Blockchain server running on http://localhost:${PORT} `);
  loadChain(); // ensure chain exists
});