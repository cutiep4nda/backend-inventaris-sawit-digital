const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getPenggajian,
  createPenggajian,
  updatePenggajian,
  deletePenggajian,
} = require("../controllers/penggajianController");

router.use(authMiddleware);

router.get("/", getPenggajian);

router.post("/", roleMiddleware("admin", "mandor"), createPenggajian);

router.put("/:id", roleMiddleware("admin", "mandor"), updatePenggajian);

router.delete("/:id", roleMiddleware("admin"), deletePenggajian);

module.exports = router;
