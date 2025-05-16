
const db = require("./firebase"); // ✅ Correct import
//file name: testFirestore.js
async function testConnection() {
  try {
    await db.collection("test").add({ message: "Firestore is working!" });
    console.log("✅ Firestore connection successful!");
  } catch (error) {
    console.error("❌ Firestore connection failed:", error);
  }
}

testConnection();



async function readTestCollection() {
  try {
    const snapshot = await db.collection("test").get();
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  } catch (error) {
    console.error("❌ Failed to read from Firestore:", error);
  }
}

readTestCollection();
