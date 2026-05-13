const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getPanen,
  createPanen,
  updatePanen,
  deletePanen,
} = require("../controllers/panenController");

router.use(authMiddleware);

router.get("/", getPanen);

router.post(
  "/",
  roleMiddleware("admin", "mandor", "pekerja_lapang"),
  createPanen,
);

router.put("/:id", roleMiddleware("admin", "mandor"), updatePanen);

router.delete("/:id", roleMiddleware("admin", "mandor"), deletePanen);

module.exports = router;
