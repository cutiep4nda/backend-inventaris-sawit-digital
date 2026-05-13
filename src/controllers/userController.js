const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const { client } = require("../config/db");
const { handleQuery } = require("../utils/dbHelper");

// GET ALL USERS
function getUsers(req, res) {
  try {
    const users = handleQuery(
      client.query(`
        SELECT * FROM users
      `),
    );

    // HAPUS PASSWORD DARI RESPONSE
    const safeUsers = users.map((user) => ({
      id: user.id,
      nama: user.nama,
      username: user.username,
      role: user.role,
      created_at: user.created_at,
    }));

    res.json({
      success: true,
      data: safeUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// CREATE USER
function createUser(req, res) {
  try {
    const { nama, username, password, role } = req.body;

    // VALIDASI
    if (!nama || !username || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    // CEK USERNAME
    const existingUsers = handleQuery(
      client.query(`
        SELECT * FROM users
        WHERE username = '${username}'
      `),
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Username sudah digunakan",
      });
    }

    // HASH PASSWORD
    const hashedPassword = bcrypt.hashSync(password, 10);

    // INSERT USER
    handleQuery(
      client.query(`
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
          '${nama}',
          '${username}',
          '${hashedPassword}',
          '${role}',
          '${new Date().toISOString()}'
        )
      `),
    );

    res.status(201).json({
      success: true,
      message: "User berhasil dibuat",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// UPDATE USER
function updateUser(req, res) {
  try {
    const { id } = req.params;

    const { nama, username, role } = req.body;

    handleQuery(
      client.query(`
        UPDATE users
        SET
          nama='${nama}',
          username='${username}',
          role='${role}'
        WHERE id='${id}'
      `),
    );

    res.json({
      success: true,
      message: "User berhasil diupdate",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// DELETE USER
function deleteUser(req, res) {
  try {
    const { id } = req.params;

    handleQuery(
      client.query(`
        DELETE FROM users
        WHERE id='${id}'
      `),
    );

    res.json({
      success: true,
      message: "User berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
