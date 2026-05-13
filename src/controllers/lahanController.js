const { v4: uuidv4 } = require("uuid");
const { client } = require("../config/db");
const { handleQuery } = require("../utils/dbHelper");

function getLahan(req, res) {
  try {
    const lahan = handleQuery(client.query(`SELECT * FROM lahan`));

    res.json({
      success: true,
      data: lahan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

function createLahan(req, res) {
  try {
    const { nama, koordinat, pemilik_id, pembeli_id } = req.body;

    if (!nama || !koordinat || !pemilik_id || !pembeli_id) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    handleQuery(
      client.query(`
        INSERT INTO lahan
        (
          id,
          nama,
          koordinat,
          pemilik_id,
          pembeli_id
        )
        VALUES
        (
          '${uuidv4()}',
          '${nama}',
          '${koordinat}',
          '${pemilik_id}',
          '${pembeli_id}'
        )
      `),
    );

    res.status(201).json({
      success: true,
      message: "Lahan berhasil ditambahkan",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

function updateLahan(req, res) {
  try {
    const { id } = req.params;
    const { nama, koordinat, pemilik_id, pembeli_id } = req.body;

    if (!nama || !koordinat || !pemilik_id || !pembeli_id) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    handleQuery(
      client.query(`
        UPDATE lahan
        SET
          nama='${nama}',
          koordinat='${koordinat}',
          pemilik_id='${pemilik_id}',
          pembeli_id='${pembeli_id}'
        WHERE id='${id}'
      `),
    );

    res.json({
      success: true,
      message: "Lahan berhasil diperbarui",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

function deleteLahan(req, res) {
  try {
    const { id } = req.params;

    handleQuery(
      client.query(`
        DELETE FROM lahan
        WHERE id='${id}'
      `),
    );

    res.json({
      success: true,
      message: "Lahan berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getLahan,
  createLahan,
  updateLahan,
  deleteLahan,
};
