require("dotenv").config();

const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const SawitDB = require("@wowoengine/sawitdb");

const db = new SawitDB(process.env.DB_PATH);

function setupDatabase() {
  try {
    console.log("🌴 Setup GreenPalm Database...\n");

    db.query(`CREATE TABLE users`);
    db.query(`CREATE TABLE pekerja_detail`);
    db.query(`CREATE TABLE pembeli`);
    db.query(`CREATE TABLE lahan`);
    db.query(`CREATE TABLE panen`);
    db.query(`CREATE TABLE penggajian`);
    db.query(`CREATE TABLE pemupukan`);
    db.query(`CREATE TABLE replanting`);
    db.query(`CREATE TABLE pengeluaran`);

    console.log("✅ Semua tabel dibuat");

    const hashedPassword = bcrypt.hashSync("admin123", 10);

    const insertResult = db.query(`
      INSERT INTO users
      (
        id,
        nama,
        username,
        password,
        role,
        created_at
      )
      VALUES
      (
        '${uuidv4()}',
        'Administrator',
        'admin',
        '${hashedPassword}',
        'admin',
        '${new Date().toISOString()}'
      )
    `);

    console.log(insertResult);

    console.log("\n🌴 Setup database selesai");

    db.close();
  } catch (error) {
    console.error(error);
  }
}

setupDatabase();
