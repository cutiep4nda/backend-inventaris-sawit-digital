const { client } = require("../config/db");
const { handleQuery } = require("../utils/dbHelper");

const PRICE_PER_KG = Number(process.env.PRICE_PER_KG || 3000);

function safeQuery(query) {
  try {
    return handleQuery(client.query(query));
  } catch {
    return [];
  }
}

function getDashboardSummary(req, res) {
  try {
    const users = safeQuery(`SELECT * FROM users`);
    const lahan = safeQuery(`SELECT * FROM lahan`);
    const panen = safeQuery(`SELECT * FROM panen`);
    const pengeluaran = safeQuery(`SELECT * FROM pengeluaran`);
    const penggajian = safeQuery(`SELECT * FROM penggajian`);
    const pemupukan = safeQuery(`SELECT * FROM pemupukan`);
    const replanting = safeQuery(`SELECT * FROM replanting`);

    const totalPanenKg = panen.reduce(
      (total, item) => total + Number(item.berat_kg || 0),
      0,
    );

    const totalPengeluaran = pengeluaran.reduce(
      (total, item) => total + Number(item.nominal || 0),
      0,
    );

    const totalGaji = penggajian.reduce(
      (total, item) => total + Number(item.nominal || 0),
      0,
    );

    const estimasiPendapatan = totalPanenKg * PRICE_PER_KG;
    const estimasiKeuntungan =
      estimasiPendapatan - totalPengeluaran - totalGaji;

    res.json({
      success: true,
      data: {
        total_user: users.length,
        total_lahan: lahan.length,
        total_panen_kg: totalPanenKg,
        total_pengeluaran: totalPengeluaran,
        total_gaji: totalGaji,
        estimasi_pendapatan: estimasiPendapatan,
        estimasi_keuntungan: estimasiKeuntungan,
        total_pemupukan: pemupukan.length,
        total_replanting: replanting.length,
        harga_per_kg: PRICE_PER_KG,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getDashboardSummary,
};
