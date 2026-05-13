const { v4: uuidv4 } = require("uuid");
const { client } = require("../config/db");
const { handleQuery } = require("../utils/dbHelper");

function getPengeluaran(req, res) {
  try {
    const pengeluaran = handleQuery(client.query(`SELECT * FROM pengeluaran`));

    res.json({
      success: true,
      data: pengeluaran,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

function createPengeluaran(req, res) {
  try {
    const { keterangan, tanggal, nominal, jenis } = req.body;

    if (!keterangan || !tanggal || !nominal || !jenis) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    if (Number(nominal) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Nominal pengeluaran harus lebih dari 0",
      });
    }

    handleQuery(
      client.query(`
        INSERT INTO pengeluaran
        (
          id,
          keterangan,
          tanggal,
          nominal,
          jenis,
          created_by
        )
        VALUES
        (
          '${uuidv4()}',
          '${keterangan}',
          '${tanggal}',
          '${nominal}',
          '${jenis}',
          '${req.user.id}'
        )
      `),
    );

    res.status(201).json({
      success: true,
      message: "Data pengeluaran berhasil ditambahkan",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

function updatePengeluaran(req, res) {
  try {
    const { id } = req.params;
    const { keterangan, tanggal, nominal, jenis } = req.body;

    if (!keterangan || !tanggal || !nominal || !jenis) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    if (Number(nominal) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Nominal pengeluaran harus lebih dari 0",
      });
    }

    handleQuery(
      client.query(`
        UPDATE pengeluaran
        SET
          keterangan='${keterangan}',
          tanggal='${tanggal}',
          nominal='${nominal}',
          jenis='${jenis}'
        WHERE id='${id}'
      `),
    );

    res.json({
      success: true,
      message: "Data pengeluaran berhasil diperbarui",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

function deletePengeluaran(req, res) {
  try {
    const { id } = req.params;

    handleQuery(
      client.query(`
        DELETE FROM pengeluaran
        WHERE id='${id}'
      `),
    );

    res.json({
      success: true,
      message: "Data pengeluaran berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getPengeluaran,
  createPengeluaran,
  updatePengeluaran,
  deletePengeluaran,
};
