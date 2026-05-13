const { v4: uuidv4 } = require("uuid");
const { client } = require("../config/db");
const { handleQuery } = require("../utils/dbHelper");

function getPemupukan(req, res) {
  try {
    const pemupukan = handleQuery(client.query(`SELECT * FROM pemupukan`));

    res.json({
      success: true,
      data: pemupukan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

function createPemupukan(req, res) {
  try {
    const { lahan_id, nama_pupuk, tanggal, umur_tanaman } = req.body;

    if (!lahan_id || !nama_pupuk || !tanggal || !umur_tanaman) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    if (Number(umur_tanaman) < 0) {
      return res.status(400).json({
        success: false,
        message: "Umur tanaman tidak valid",
      });
    }

    handleQuery(
      client.query(`
        INSERT INTO pemupukan
        (
          id,
          lahan_id,
          nama_pupuk,
          tanggal,
          umur_tanaman
        )
        VALUES
        (
          '${uuidv4()}',
          '${lahan_id}',
          '${nama_pupuk}',
          '${tanggal}',
          '${umur_tanaman}'
        )
      `),
    );

    res.status(201).json({
      success: true,
      message: "Data pemupukan berhasil ditambahkan",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

function updatePemupukan(req, res) {
  try {
    const { id } = req.params;
    const { lahan_id, nama_pupuk, tanggal, umur_tanaman } = req.body;

    if (!lahan_id || !nama_pupuk || !tanggal || !umur_tanaman) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    if (Number(umur_tanaman) < 0) {
      return res.status(400).json({
        success: false,
        message: "Umur tanaman tidak valid",
      });
    }

    handleQuery(
      client.query(`
        UPDATE pemupukan
        SET
          lahan_id='${lahan_id}',
          nama_pupuk='${nama_pupuk}',
          tanggal='${tanggal}',
          umur_tanaman='${umur_tanaman}'
        WHERE id='${id}'
      `),
    );

    res.json({
      success: true,
      message: "Data pemupukan berhasil diperbarui",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

function deletePemupukan(req, res) {
  try {
    const { id } = req.params;

    handleQuery(
      client.query(`
        DELETE FROM pemupukan
        WHERE id='${id}'
      `),
    );

    res.json({
      success: true,
      message: "Data pemupukan berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getPemupukan,
  createPemupukan,
  updatePemupukan,
  deletePemupukan,
};
