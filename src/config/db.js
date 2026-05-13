const SawitDB = require("@wowoengine/sawitdb");

const client = new SawitDB(process.env.DB_PATH);

function connectDB() {
  try {
    console.log("✅ SawitDB initialized");

    return client;
  } catch (error) {
    console.error("❌ Database initialization failed:", error.message);
    process.exit(1);
  }
}

module.exports = {
  client,
  connectDB,
};
