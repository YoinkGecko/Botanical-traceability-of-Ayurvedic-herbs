// bcserver.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");


const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors()); // <-- allow all origins

// Path to store blockchain file in same folder
const chainFile = path.join(__dirname, "chain.json");

// ----------------- Blockchain Helpers -----------------

// Hash generator
function calculateHash(data, previousHash, timestamp) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(data) + previousHash + timestamp)
    .digest("hex");
}

// Create genesis block
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

// Reset blockchain file
function resetChain() {
  const genesisBlock = createGenesisBlock();
  fs.writeFileSync(chainFile, JSON.stringify([genesisBlock], null, 2));
  console.log("⚠️ Chain invalid → Reset with Genesis Block");
  return [genesisBlock];
}

// Load chain (if not exists → create genesis)
function loadChain() {
  if (!fs.existsSync(chainFile)) {
    return resetChain();
  }
  return JSON.parse(fs.readFileSync(chainFile));
}

// Save chain
function saveChain(chain) {
  fs.writeFileSync(chainFile, JSON.stringify(chain, null, 2));
}

// Verify chain
function verifyChain(chain) {
  for (let i = 1; i < chain.length; i++) {
    const block = chain[i];
    const prevBlock = chain[i - 1];

    if (block.previousHash !== prevBlock.hash) return false;

    const recalculatedHash = calculateHash(
      block.data,
      block.previousHash,
      block.timestamp
    );
    if (block.hash !== recalculatedHash) return false;
  }
  return true;
}

// ----------------- Routes -----------------

// 1. Add new data to chain
app.post("/add", (req, res) => {
  const { data } = req.body;
  if (!data) return res.status(400).send("Data is required!");

  let chain = loadChain();

  // If chain invalid → reset
  if (!verifyChain(chain)) {
    chain = resetChain();
  }

  // Add new block
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

// 2. Get block by ID
app.get("/block/:id", (req, res) => {
  const chain = loadChain();
  const block = chain.find((b) => b.index === parseInt(req.params.id));
  if (!block) return res.status(404).send("Block not found!");
  res.json(block);
});

// 3. Get full blockchain
app.get("/chain", (req, res) => {
  const chain = loadChain();
  res.json(chain);
});

// 4. Verify blockchain
app.get("/verify", (req, res) => {
  const chain = loadChain();
  const isValid = verifyChain(chain);
  res.json({ valid: isValid });
});

// 5. Get total number of blocks
app.get("/count", (req, res) => {
  const chain = loadChain();
  res.json({ totalBlocks: chain.length });
});

// ----------------- Server Start -----------------

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Blockchain server running on http://localhost:${PORT}`);
  loadChain(); // Ensure file & Genesis block exists
});