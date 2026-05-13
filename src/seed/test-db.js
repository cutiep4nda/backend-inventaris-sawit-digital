require("dotenv").config();

const SawitDB = require("@wowoengine/sawitdb");

const db = new SawitDB(process.env.DB_PATH);

async function test() {
  try {
    const result1 = await db.query(`
      CREATE TABLE users
    `);

    console.log(result1);

    const result2 = await db.query(`
      INSERT INTO users (nama, username)
      VALUES ('Admin', 'admin')
    `);

    console.log(result2);

    const result3 = await db.query(`
      SELECT * FROM users
    `);

    console.log(result3);
  } catch (error) {
    console.error(error);
  }
}

test();
