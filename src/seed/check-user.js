require("dotenv").config();

const SawitDB = require("@wowoengine/sawitdb");

const db = new SawitDB(process.env.DB_PATH);

const users = db.query(`
  SELECT * FROM users
`);

console.log(users);

db.close();
