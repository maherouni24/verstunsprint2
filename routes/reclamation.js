const express = require("express");

const {
  addReclamation,
  reclamationsByUser,
  traiterReclamation,
  reclamationById,
  getAllReclamations,
} = require("../controllers/reclamation");
const { requireSignin } = require("../controllers/auth");
const { userByUsername } = require("../controllers/user");

const router = express.Router();

router.post("/add/:userName/", requireSignin, addReclamation);
router.get("/get/:userName/", requireSignin, reclamationsByUser);
router.put("/approve/:userName/:reclamationId",requireSignin,traiterReclamation);
router.get("/getall/:userName", requireSignin, getAllReclamations);
// any route containing username our app will first execute userByUsername()
router.param("userName", userByUsername);
router.param("reclamationId", reclamationById);

module.exports = router;
