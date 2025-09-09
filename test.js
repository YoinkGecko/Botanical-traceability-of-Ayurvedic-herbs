// test.js
const axios = require("axios");

const BASE_URL = "http://localhost:3000";

// 1. Add some blocks
async function addBlock(data) {
  try {
    const res = await axios.post(`${BASE_URL}/add`, { data });
    console.log("✅ Block added:", res.data.block);
  } catch (err) {
    console.error("❌ Error adding block:", err.message);
  }
}

// 2. Get block by ID
async function getBlock(id) {
  try {
    const res = await axios.get(`${BASE_URL}/block/${id}`);
    console.log(`📦 Block ${id}:`, res.data);
  } catch (err) {
    console.error(`❌ Error fetching block ${id}:`, err.message);
  }
}

// 3. Get full chain
async function getChain() {
  try {
    const res = await axios.get(`${BASE_URL}/chain`);
    console.log("🔗 Full Chain:", res.data);
  } catch (err) {
    console.error("❌ Error fetching chain:", err.message);
  }
}

// 4. Verify blockchain
async function verifyChain() {
  try {
    const res = await axios.get(`${BASE_URL}/verify`);
    console.log("🛡️ Chain Valid?:", res.data.valid);
  } catch (err) {
    console.error("❌ Error verifying chain:", err.message);
  }
}

// Run all tests step by step
async function runTests() {
  console.log("\n🚀 Starting Blockchain Tests...\n");

  //await addBlock({ farmer: "Ram", product: "Aloe Vera" });
  //await addBlock({ farmer: "Shyam", product: "Tulsi" });

  //await getBlock(1); // Genesis block
  //await getBlock(2); // First added block

  //await getChain();
await addBlock({ farmer: "kashhacker", product: "hacker Vera" });

  await verifyChain();

  console.log("\n✅ All tests finished!\n");
}

runTests();