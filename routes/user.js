const express = require("express");

const { requireSignin } = require("../controllers/auth");
const {
  userByUsername,
  deleteUser,
  getUser,
  updateUser,
} = require("../controllers/user");

const router = express.Router();

router.get("/:userName", requireSignin, getUser);

router.delete("/delete/:id/:userName", requireSignin, deleteUser);
router.put("/update/:id/:userName", requireSignin, updateUser);

// any route containing username our app will first execute userByUsername()
router.param("userName", userByUsername);

module.exports = router;
