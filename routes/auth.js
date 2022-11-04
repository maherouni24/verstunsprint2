const express = require("express");

const {
  signup,
  signin,
  signout,
  requireSignin,
} = require("../controllers/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", requireSignin, signout);

module.exports = router;
