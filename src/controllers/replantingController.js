const { v4: uuidv4 } = require("uuid");
const { client } = require("../config/db");
const { handleQuery } = require("../utils/dbHelper");

function getReplanting(req, res) {
  try {
    const replanting = handleQuery(client.query(`SELECT * FROM replanting`));

    res.json({
      success: true,
      data: replanting,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

function createReplanting(req, res) {
  try {
    const { lahan_id, nama_tanaman, tanggal } = req.body;

    if (!lahan_id || !nama_tanaman || !tanggal) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    handleQuery(
      client.query(`
        INSERT INTO replanting
        (
          id,
          lahan_id,
          nama_tanaman,
          tanggal
        )
        VALUES
        (
          '${uuidv4()}',
          '${lahan_id}',
          '${nama_tanaman}',
          '${tanggal}'
        )
      `),
    );

    res.status(201).json({
      success: true,
      message: "Data replanting berhasil ditambahkan",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

function updateReplanting(req, res) {
  try {
    const { id } = req.params;
    const { lahan_id, nama_tanaman, tanggal } = req.body;

    if (!lahan_id || !nama_tanaman || !tanggal) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    handleQuery(
      client.query(`
        UPDATE replanting
        SET
          lahan_id='${lahan_id}',
          nama_tanaman='${nama_tanaman}',
          tanggal='${tanggal}'
        WHERE id='${id}'
      `),
    );

    res.json({
      success: true,
      message: "Data replanting berhasil diperbarui",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

function deleteReplanting(req, res) {
  try {
    const { id } = req.params;

    handleQuery(
      client.query(`
        DELETE FROM replanting
        WHERE id='${id}'
      `),
    );

    res.json({
      success: true,
      message: "Data replanting berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getReplanting,
  createReplanting,
  updateReplanting,
  deleteReplanting,
};
