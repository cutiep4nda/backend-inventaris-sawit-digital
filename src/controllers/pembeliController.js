const { v4: uuidv4 } = require("uuid");
const { client } = require("../config/db");
const { handleQuery } = require("../utils/dbHelper");

function getPembeli(req, res) {
  try {
    const pembeli = handleQuery(client.query(`SELECT * FROM pembeli`));

    res.json({
      success: true,
      data: pembeli,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

function createPembeli(req, res) {
  try {
    const { nama, tanggal_kontrak } = req.body;

    if (!nama || !tanggal_kontrak) {
      return res.status(400).json({
        success: false,
        message: "Nama dan tanggal kontrak wajib diisi",
      });
    }

    handleQuery(
      client.query(`
        INSERT INTO pembeli
        (
          id,
          nama,
          tanggal_kontrak
        )
        VALUES
        (
          '${uuidv4()}',
          '${nama}',
          '${tanggal_kontrak}'
        )
      `),
    );

    res.status(201).json({
      success: true,
      message: "Pembeli berhasil ditambahkan",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

function updatePembeli(req, res) {
  try {
    const { id } = req.params;
    const { nama, tanggal_kontrak } = req.body;

    if (!nama || !tanggal_kontrak) {
      return res.status(400).json({
        success: false,
        message: "Nama dan tanggal kontrak wajib diisi",
      });
    }

    handleQuery(
      client.query(`
        UPDATE pembeli
        SET
          nama='${nama}',
          tanggal_kontrak='${tanggal_kontrak}'
        WHERE id='${id}'
      `),
    );

    res.json({
      success: true,
      message: "Pembeli berhasil diperbarui",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

function deletePembeli(req, res) {
  try {
    const { id } = req.params;

    handleQuery(
      client.query(`
        DELETE FROM pembeli
        WHERE id='${id}'
      `),
    );

    res.json({
      success: true,
      message: "Pembeli berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getPembeli,
  createPembeli,
  updatePembeli,
  deletePembeli,
};
