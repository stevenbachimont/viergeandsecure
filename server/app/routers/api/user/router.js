const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  updateProfilePicture,
  add,
  validateToken,
  userActions,
  updateAdminAndVerify, // Add this line
} = require("../../../controllers/userActions");

const { hashPassword, verifyToken, login } = require("../../../services/auth");

router.get("/", browse);

router.get("/:id", read);

router.post("/", hashPassword, add);

router.post("/login", login);

router.post("/validateToken", verifyToken, validateToken);

router.patch("/update", updateProfilePicture);

router.put("/admin-verify", updateAdminAndVerify);
router.use(verifyToken);

module.exports = router;
