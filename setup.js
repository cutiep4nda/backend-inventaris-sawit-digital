const { SawitClient } = require("@wowoengine/sawitdb");

const client = new SawitClient("sawitdb://localhost:7878");

async function setup() {
  await client.connect();
  console.log("✅ Terhubung ke SawitDB");

  // Buat database
  await client.query("CREATE DATABASE greenpalm");
  await client.query("USE greenpalm");
  console.log("✅ Database greenpalm dibuat");

  // ── Tabel 1: users ──
  await client.query("CREATE TABLE users");
  await client.query(
    `INSERT INTO users (id, nama, username, password, role, created_at) VALUES (0, '', '', '', '', '')`,
  );
  await client.query("DELETE FROM users WHERE id = 0");
  console.log("✅ Tabel users dibuat");

  // ── Tabel 2: pekerja_detail ──
  await client.query("CREATE TABLE pekerja_detail");
  console.log("✅ Tabel pekerja_detail dibuat");

  // ── Tabel 3: pembeli ──
  await client.query("CREATE TABLE pembeli");
  console.log("✅ Tabel pembeli dibuat");

  // ── Tabel 4: lahan ──
  await client.query("CREATE TABLE lahan");
  console.log("✅ Tabel lahan dibuat");

  // ── Tabel 5: panen ──
  await client.query("CREATE TABLE panen");
  console.log("✅ Tabel panen dibuat");

  // ── Tabel 6: penggajian ──
  await client.query("CREATE TABLE penggajian");
  console.log("✅ Tabel penggajian dibuat");

  // ── Tabel 7: pemupukan ──
  await client.query("CREATE TABLE pemupukan");
  console.log("✅ Tabel pemupukan dibuat");

  // ── Tabel 8: replanting ──
  await client.query("CREATE TABLE replanting");
  console.log("✅ Tabel replanting dibuat");

  // ── Tabel 9: pengeluaran ──
  await client.query("CREATE TABLE pengeluaran");
  console.log("✅ Tabel pengeluaran dibuat");

  // ── Index untuk performa ──
  await client.query("CREATE INDEX ON users (username)");
  await client.query("CREATE INDEX ON panen (lahan_id)");
  await client.query("CREATE INDEX ON panen (pekerja_id)");
  await client.query("CREATE INDEX ON penggajian (pekerja_id)");
  await client.query("CREATE INDEX ON pemupukan (lahan_id)");
  await client.query("CREATE INDEX ON replanting (lahan_id)");
  await client.query("CREATE INDEX ON pekerja_detail (user_id)");
  await client.query("CREATE INDEX ON lahan (pemilik_id)");
  await client.query("CREATE INDEX ON lahan (pembeli_id)");
  console.log("✅ Index dibuat");

  // ── Seed: akun admin default ──
  await client.query(`
    INSERT INTO users (nama, username, password, role, created_at)
    VALUES ('Administrator', 'admin', 'admin123', 'admin', '${new Date().toISOString()}')
  `);
  console.log(
    "✅ Akun admin default dibuat (username: admin, password: admin123)",
  );

  console.log("\n🌴 Setup database GreenPalm selesai!");
  await client.disconnect();
}

setup().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
