const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// SEMUA ROUTE USER HARUS LOGIN + ADMIN
router.use(authMiddleware);
router.use(roleMiddleware("admin"));

router.get("/", getUsers);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
