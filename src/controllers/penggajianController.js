const { v4: uuidv4 } = require("uuid");
const { client } = require("../config/db");
const { handleQuery } = require("../utils/dbHelper");

function getPenggajian(req, res) {
  try {
    const penggajian = handleQuery(client.query(`SELECT * FROM penggajian`));

    res.json({
      success: true,
      data: penggajian,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

function createPenggajian(req, res) {
  try {
    const { pekerja_id, bulan, nominal, status, tanggal_bayar } = req.body;

    if (!pekerja_id || !bulan || !nominal || !status) {
      return res.status(400).json({
        success: false,
        message: "Pekerja, bulan, nominal, dan status wajib diisi",
      });
    }

    if (Number(nominal) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Nominal gaji harus lebih dari 0",
      });
    }

    if (!["dibayar", "pending"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status hanya boleh dibayar atau pending",
      });
    }

    handleQuery(
      client.query(`
        INSERT INTO penggajian
        (
          id,
          pekerja_id,
          bulan,
          nominal,
          status,
          tanggal_bayar
        )
        VALUES
        (
          '${uuidv4()}',
          '${pekerja_id}',
          '${bulan}',
          '${nominal}',
          '${status}',
          '${tanggal_bayar || ""}'
        )
      `),
    );

    res.status(201).json({
      success: true,
      message: "Data penggajian berhasil ditambahkan",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

function updatePenggajian(req, res) {
  try {
    const { id } = req.params;
    const { pekerja_id, bulan, nominal, status, tanggal_bayar } = req.body;

    if (!pekerja_id || !bulan || !nominal || !status) {
      return res.status(400).json({
        success: false,
        message: "Pekerja, bulan, nominal, dan status wajib diisi",
      });
    }

    if (Number(nominal) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Nominal gaji harus lebih dari 0",
      });
    }

    if (!["dibayar", "pending"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status hanya boleh dibayar atau pending",
      });
    }

    handleQuery(
      client.query(`
        UPDATE penggajian
        SET
          pekerja_id='${pekerja_id}',
          bulan='${bulan}',
          nominal='${nominal}',
          status='${status}',
          tanggal_bayar='${tanggal_bayar || ""}'
        WHERE id='${id}'
      `),
    );

    res.json({
      success: true,
      message: "Data penggajian berhasil diperbarui",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

function deletePenggajian(req, res) {
  try {
    const { id } = req.params;

    handleQuery(
      client.query(`
        DELETE FROM penggajian
        WHERE id='${id}'
      `),
    );

    res.json({
      success: true,
      message: "Data penggajian berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getPenggajian,
  createPenggajian,
  updatePenggajian,
  deletePenggajian,
};
