const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getPengeluaran,
  createPengeluaran,
  updatePengeluaran,
  deletePengeluaran,
} = require("../controllers/pengeluaranController");

router.use(authMiddleware);

router.get("/", getPengeluaran);

router.post("/", roleMiddleware("admin", "mandor"), createPengeluaran);

router.put("/:id", roleMiddleware("admin", "mandor"), updatePengeluaran);

router.delete("/:id", roleMiddleware("admin"), deletePengeluaran);

module.exports = router;
