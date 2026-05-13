const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getPemupukan,
  createPemupukan,
  updatePemupukan,
  deletePemupukan,
} = require("../controllers/pemupukanController");

router.use(authMiddleware);

router.get("/", getPemupukan);

router.post("/", roleMiddleware("admin", "mandor"), createPemupukan);

router.put("/:id", roleMiddleware("admin", "mandor"), updatePemupukan);

router.delete("/:id", roleMiddleware("admin", "mandor"), deletePemupukan);

module.exports = router;
