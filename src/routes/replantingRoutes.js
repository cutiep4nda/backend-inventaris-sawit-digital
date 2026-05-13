const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getReplanting,
  createReplanting,
  updateReplanting,
  deleteReplanting,
} = require("../controllers/replantingController");

router.use(authMiddleware);

router.get("/", getReplanting);

router.post("/", roleMiddleware("admin", "mandor"), createReplanting);

router.put("/:id", roleMiddleware("admin", "mandor"), updateReplanting);

router.delete("/:id", roleMiddleware("admin", "mandor"), deleteReplanting);

module.exports = router;
