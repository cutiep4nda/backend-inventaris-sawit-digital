const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getPembeli,
  createPembeli,
  updatePembeli,
  deletePembeli,
} = require("../controllers/pembeliController");

router.use(authMiddleware);

router.get("/", getPembeli);

router.post("/", roleMiddleware("admin", "mandor"), createPembeli);

router.put("/:id", roleMiddleware("admin", "mandor"), updatePembeli);

router.delete("/:id", roleMiddleware("admin"), deletePembeli);

module.exports = router;
