const jwt = require("jsonwebtoken");
require("dotenv").config();
const expressJwt = require("express-jwt");
const Models = require("./../models");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const nodemailer=require("nodemailer");
const User = Models.User;

exports.signup = async (req, res) => {
  const userExistsEmail = await User.findOne({
    where: { mail: req.body.mail },
  });
  const userExistsUsername = await User.findOne({
    where: { username: req.body.username },
  });
  if (userExistsEmail)
    return res.status(403).json({
      error: "User with this Email already exists !",
    });
  if (userExistsUsername)
    return res.status(403).json({
      error: "User with this Username already exists !",
    });
  const salt = await bcrypt.genSalt(10);
  var new_user = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    mail: req.body.mail,
    adresse: req.body.adresse,
    tel: req.body.tel,
    age: req.body.age,
    dateNaissance: req.body. dateNaissance,
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, salt),

    Matricule_Admin: req.body.Matricule_Admin,
    Matricule_Agent: req.body.Matricule_Agent,
    role: req.body.role,


  };
  created_user = await User.create(new_user);
  res.status(200).json({ message: "You have successfully signed up !" });
  //
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yahyaoui.nader@esprit.tn",
      pass: "E07138703", // naturally, replace both with your real credentials or an application-specific password
    },
  });
  const mailOptions = {
    from: "yahyaoui.nader@esprit.tn",
    to: new_user.email,
    subject: "verfication",
    text: "Bienvenue à Verstun,Site de reservation en ligne, " + new_user.nom +". Nous sommes ravis de vous avoir parmi nous.\n Votre username est :" +new_user.username 
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " );
    }
  });





};





exports.signin = async (req, res) => {
  // find the user based on username
  const { username, password } = req.body;

  await User.findOne({ where: { username: username } }).then(async (user) => {
    if (!user) {
      return res.status(401).json({
        error: "User with that username does not exist. please signup.",
      });
    }
    const password_valid = await bcrypt.compare(password, user.password);
    if (!password_valid) {
      return res.status(401).json({
        error: "Wrong password ! ",
      });
    }


    // generate a token with user id and secret
    const token = jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60, _id: user._id },
      process.env.JWT_SECRET
    );

    // persis the toke as 't' in cookie with expiry date
    res.cookie("t", token, { httpOnly: true });
    // return response with user and token to frontend client
    const { nom, prenom, dateNaissance, adresse,numTel,email, CIN,username,Matricule_Admin,Matricule_Agent, role } = user;
    return res.json({
      token: token,
      user: { nom, prenom, dateNaissance, adresse,numTel,email, CIN,username,Matricule_Admin,Matricule_Agent, role },
      message: "Signin succesfully !",
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "You have successfully signed out!" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
});
