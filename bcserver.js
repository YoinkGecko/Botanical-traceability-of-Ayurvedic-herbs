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
const chainFile = path.join(__dirname, "chain.json");

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

function resetChain() {
  const genesisBlock = createGenesisBlock();
  saveChain([genesisBlock]);
  console.log("⚠️ Chain reset with Genesis Block");
  return [genesisBlock];
}

function loadChain() {
  if (!fs.existsSync(chainFile)) return resetChain();
  return JSON.parse(fs.readFileSync(chainFile));
}

function saveChain(chain) {
  fs.writeFileSync(chainFile, JSON.stringify(chain, null, 2));

  // Timestamped backup
  const now = new Date();
  const ts = `${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2,'0')}${now.getDate().toString().padStart(2,'0')}_${now.getHours().toString().padStart(2,'0')}${now.getMinutes().toString().padStart(2,'0')}${now.getSeconds().toString().padStart(2,'0')}`;
  const backupFile = path.join(__dirname, `chain_backup_${ts}.json`);
  fs.writeFileSync(backupFile, JSON.stringify(chain, null, 2));
  console.log(`✅ Blockchain saved. Backup created: ${backupFile}`);
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
    console.warn(`⚠️ Chain invalid at block ${invalidIndex}! Restoring from latest backup...`);
    const backups = fs.readdirSync(__dirname)
      .filter(f => f.startsWith("chain_backup_") && f.endsWith(".json"))
      .sort();
    if (backups.length) {
      const latestBackup = backups[backups.length - 1];
      chain = JSON.parse(fs.readFileSync(path.join(__dirname, latestBackup)));
      saveChain(chain);
      console.log(`✅ Blockchain restored from backup: ${latestBackup}`);
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

app.get("/chain", (req, res) => {
  res.json(loadChain());
});

app.get("/verify", (req, res) => {
  const chain = loadChain();
  const invalidIndex = verifyChain(chain);
  res.json({ valid: invalidIndex === -1, invalidBlock: invalidIndex !== -1 ? invalidIndex : null });
});

app.get("/count", (req, res) => {
  const chain = loadChain();
  res.json({ totalBlocks: chain.length });
});

// ----------------- Tamper Detection & Auto-Restore -----------------
setInterval(() => {
  const chain = loadChain();
  const invalidIndex = verifyChain(chain);
  const now = new Date().toISOString();

  if (invalidIndex !== -1) {
    console.error(`⚠️ [${now}] Tamper detected at block ${invalidIndex}! Restoring from latest backup...`);
    const backups = fs.readdirSync(__dirname)
      .filter(f => f.startsWith("chain_backup_") && f.endsWith(".json"))
      .sort();
    if (backups.length) {
      const latestBackup = backups[backups.length - 1];
      fs.copyFileSync(path.join(__dirname, latestBackup), chainFile);
      console.log(`✅ Blockchain restored from backup: ${latestBackup}`);
    } else {
      console.error("❌ No backup found! Manual intervention required.");
    }
  } else {
    console.log(`✅ [${now}] Blockchain valid`);
  }
}, 5000); // every 5 seconds

// ----------------- Server Start -----------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Blockchain server running on http://localhost:${PORT}`);
  loadChain(); // ensure chain exists
});