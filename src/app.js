const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const userRoutes = require("./routes/userRoutes");
const pembeliRoutes = require("./routes/pembeliRoutes");
const lahanRoutes = require("./routes/lahanRoutes");
const panenRoutes = require("./routes/panenRoutes");
const pemupukanRoutes = require("./routes/pemupukanRoutes");
const replantingRoutes = require("./routes/replantingRoutes");
const penggajianRoutes = require("./routes/penggajianRoutes");
const pengeluaranRoutes = require("./routes/pengeluaranRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

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
app.use("/api/panen", panenRoutes);
app.use("/api/pemupukan", pemupukanRoutes);
app.use("/api/replanting", replantingRoutes);
app.use("/api/penggajian", penggajianRoutes);
app.use("/api/pengeluaran", pengeluaranRoutes);
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;
