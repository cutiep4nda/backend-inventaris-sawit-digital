const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getLahan,
  createLahan,
  updateLahan,
  deleteLahan,
} = require("../controllers/lahanController");

router.use(authMiddleware);

router.get("/", getLahan);

router.post("/", roleMiddleware("admin", "mandor"), createLahan);

router.put("/:id", roleMiddleware("admin", "mandor"), updateLahan);

router.delete("/:id", roleMiddleware("admin"), deleteLahan);

module.exports = router;
