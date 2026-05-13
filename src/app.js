const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const userRoutes = require("./routes/userRoutes");
const pembeliRoutes = require("./routes/pembeliRoutes");
const lahanRoutes = require("./routes/lahanRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "🌴 GreenPalm API Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pembeli", pembeliRoutes);
app.use("/api/lahan", lahanRoutes);

module.exports = app;
