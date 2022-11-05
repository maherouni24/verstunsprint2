const Models = require("./../models");
const nodemailer = require("nodemailer");
const Reclamation = Models.Reclamation;
const User = Models.User;
//addReclamation
exports.addReclamation = async (req, res) => {
  var new_reclamation = {
    categorie: req.body.categorie,
    message: req.body.message,
    statut: false,
    ownerId: req.profile.id,
  };

  let reclamation = await Reclamation.create(new_reclamation)
    .then((rec) => {
      res.status(200).json({ message: "Reclamation susscefully saved !", rec });
    })
    .catch((err) => { 
      res.status(400).json({
        error: err,
      });
    });
};
//reclamationsByUser
exports.reclamationsByUser = (req, res) => {
  Reclamation.findAll({ where: { ownerId: req.profile.id } })
    .then((reclamations) => {
      res.status(200).json({ reclamations });
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
};
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yahyaoui.nader@esprit.tn",
    pass: "E07138703", // naturally, replace both with your real credentials or an application-specific password
  },
});
//traiterReclamation
exports.traiterReclamation = async (req, res) => {
  const isAdmin = req.profile.role == "admin";
  if (!isAdmin) {
    return res.status(403).json({
      error: "You are  not authorized to perform this action !",
    });
  }
  let reclamation = req.reclamation;
  if (reclamation.statut == true) {
    return res.status(400).json({
      error: "You have already approved this reclamationn !",
    });
  }
  reclamation.update({ statut: true });

  let user = await User.findOne({ where: { id: reclamation.ownerId } });

  const mailOptions = {
    from: "yahyaoui.nader@esprit.tn",
    to: "nader.yahyaoui0@gmail.com",
    subject: "Réclamation",
    text: "Votre réclamation est traitée",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  reclamation
    .save()
    .then((rec) => {
      res
        .status(200)
        .json({ message: "reclamation approved successfully", rec });
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
};
//reclamationById
exports.reclamationById = (req, res, next, id) => {
  Reclamation.findOne({ where: { id: id } }).then((reclamation) => {
    if (!reclamation) {
      return res.status(400).json({
        error: "reclamation not found !",
      });
    }
    req.reclamation = reclamation;
    next();
  });
};
//getAllReclamations
exports.getAllReclamations = (req, res) => {
  const isAdmin = req.profile.role == "admin";
  if (!isAdmin) {
    return res.status(403).json({
      error: "You are  not authorized to perform this action !",
    });
  }
  Reclamation.findAll()
    .then((reclamations) => {
      res.status(200).json({ reclamations });
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
};
