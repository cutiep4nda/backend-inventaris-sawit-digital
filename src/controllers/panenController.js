const { v4: uuidv4 } = require("uuid");
const { client } = require("../config/db");
const { handleQuery } = require("../utils/dbHelper");

function getPanen(req, res) {
  try {
    const panen = handleQuery(client.query(`SELECT * FROM panen`));

    res.json({
      success: true,
      data: panen,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

function createPanen(req, res) {
  try {
    const { lahan_id, pekerja_id, berat_kg } = req.body;

    if (!lahan_id || !pekerja_id || !berat_kg) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    if (Number(berat_kg) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Berat panen harus lebih dari 0",
      });
    }

    handleQuery(
      client.query(`
        INSERT INTO panen
        (
          id,
          lahan_id,
          pekerja_id,
          berat_kg,
          tanggal
        )
        VALUES
        (
          '${uuidv4()}',
          '${lahan_id}',
          '${pekerja_id}',
          '${berat_kg}',
          '${new Date().toISOString()}'
        )
      `),
    );

    res.status(201).json({
      success: true,
      message: "Data panen berhasil ditambahkan",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

function updatePanen(req, res) {
  try {
    const { id } = req.params;
    const { lahan_id, pekerja_id, berat_kg } = req.body;

    if (!lahan_id || !pekerja_id || !berat_kg) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    if (Number(berat_kg) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Berat panen harus lebih dari 0",
      });
    }

    handleQuery(
      client.query(`
        UPDATE panen
        SET
          lahan_id='${lahan_id}',
          pekerja_id='${pekerja_id}',
          berat_kg='${berat_kg}'
        WHERE id='${id}'
      `),
    );

    res.json({
      success: true,
      message: "Data panen berhasil diperbarui",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

function deletePanen(req, res) {
  try {
    const { id } = req.params;

    handleQuery(
      client.query(`
        DELETE FROM panen
        WHERE id='${id}'
      `),
    );

    res.json({
      success: true,
      message: "Data panen berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getPanen,
  createPanen,
  updatePanen,
  deletePanen,
};
