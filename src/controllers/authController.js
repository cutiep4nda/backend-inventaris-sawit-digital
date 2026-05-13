const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { client } = require("../config/db");

async function login(req, res) {
  try {
    const { username, password } = req.body;

    // VALIDASI INPUT
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username dan password wajib diisi",
      });
    }

    // CARI USER
    const users = client.query(`
      SELECT * FROM users
      WHERE username = '${username}'
    `);
    if (typeof users === "string") {
      return res.status(500).json({
        success: false,
        message: users,
      });
    }

    const user = users[0];

    // USER TIDAK ADA
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Username atau password salah",
      });
    }

    // CEK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Username atau password salah",
      });
    }

    // GENERATE TOKEN
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    // RESPONSE
    res.json({
      success: true,
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        nama: user.nama,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

module.exports = {
  login,
};
