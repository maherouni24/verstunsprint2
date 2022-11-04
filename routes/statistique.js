const express = require("express");


const {reclamationTotal,AallUsers} = require("../controllers/statistique");
const { requireSignin } = require("../controllers/auth");
const { userByUsername} = require("../controllers/user");

const router = express.Router();


router.get("/stat/getrec/:userName", requireSignin, reclamationTotal);
router.get("/stat/getuser/:userName", requireSignin, AallUsers);
router.param("userName", userByUsername);
module.exports = router;