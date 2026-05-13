function profile(req, res) {
  res.json({
    success: true,
    message: "Protected route berhasil diakses",
    user: req.user,
  });
}

module.exports = {
  profile,
};
