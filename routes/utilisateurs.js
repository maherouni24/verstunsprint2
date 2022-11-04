var express = require('express');
var router = express.Router();

const { Op } = require("sequelize");
var etatU;

var db=require('../models');

//Imports
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var asyncLib  = require('async');
var jwtUtils  = require('../utils/jwt.utils');
// Constants
const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,8}$/;
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//add
router.post('/add',(req,res)=>{
  db.Utilisateurs.create(req.body).then((response)=>{
    res.status(200).send(response)}).catch((err)=>{
  res.status(400).send(err)
  })
  });

//update
  router.put('/update/:id',(req,res)=>{
    db.Utilisateurs.update(req.body,{where:{id:req.params.id}}).then((response)=>{
      res.status(200).send(response)}).catch((err)=>{
    res.status(400).send(err)
    })
    });

  //delete
    router.delete('/remove/:id',(req,res)=>{
      db.Utilisateurs.destroy({where:{id:req.params.id}}).then((response)=>{
        res.status(200).send(response)}).catch((err)=>{
      res.status(400).send(err)
      })
    });


    router.get('/utilisateurs/:id',(req,res)=>{
      db.Utilisateurs.findOne({where:{id: req.params.id}}).then((response)=>{
        res.status(200).send(response)}).catch((err)=>{
      res.status(400).send(err)
      })
    });


//details
      router.get('/detail/:id',(req,res)=>{
        db.Utilisateurs.findOne({where:{id: req.params.id}}).then((resp)=>{
          res.send(resp)
        })
      });
//register
router.post('/register',(req,res)=>{
  // Params
  var nom    = req.body.nom;
  var prenom = req.body.prenom;
  var mail = req.body.mail;
  var adresse = req.body.adresse;
  var tel = req.body.tel;
  var age = req.body.age;
  var dateNaissance = req.body.dateNaissance;
  var password = req.body.password;
  var RoleId = req.body.RoleId;
  if (nom == null || prenom == null || mail == null || adresse == null || tel == null || age == null || dateNaissance == null || password == null ) {
    return res.status(400).json({ 'error': 'missing parameters' });
  }

  if (nom.length >= 13 || nom.length <= 4) {
    return res.status(400).json({ 'error': 'wrong name (must be length 5 - 12)' });
  }

  if (!EMAIL_REGEX.test(mail)) {
    return res.status(400).json({ 'error': 'email is not valid' });
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({ 'error': 'password invalid (must length 4 - 8 and include 1 number at least)' });
  }
  asyncLib.waterfall([
    function(done) {
      db.Utilisateurs.findOne({
        attributes: ['mail'],
        where: { mail: mail }
      })
      .then(function(userFound) {
        done(null, userFound);
      })
      .catch(function(err) {
        return res.status(500).json({ 'error': 'unable to verify user' });
      });
    },
    function(userFound, done) {
      if (!userFound) {
        bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
          done(null, userFound, bcryptedPassword);
        });
      } else {
        return res.status(409).json({ 'error': 'user already exist' });
      }
    },
    function(userFound, bcryptedPassword, done) {
      var newUser = db.Utilisateurs.create({

        nom : nom,
        prenom : prenom,
        mail: mail,
        adresse : adresse,
        tel : tel,
        age : age,
        dateNaissance : dateNaissance,
        password: bcryptedPassword,
     
      })
      .then(function(newUser) {
        done(newUser);
      })
      .catch(function(err) {
        return res.status(500).json({ 'error': 'cannot add user' });
      });
    }
  ], function(newUser) {
    if (newUser) {
      return res.status(201).json({
        'userId': newUser.id
      });
    } else {
      return res.status(500).json({ 'error': 'cannot add user' });
    }
  });
},


//authentification 
router.post('/login',(req,res)=>{
  // Params
  var mail    = req.body.mail;
  var password = req.body.password;

  if (mail == null ||  password == null) {
    return res.status(400).json({ 'error': 'missing parameters' });
  }
  asyncLib.waterfall([
    function(done) {
      db.Utilisateurs.findOne({
        where: { mail: mail }
      })
      .then(function(userFound) {
        done(null, userFound);
      })
      .catch(function(err) {
        return res.status(500).json({ 'error': 'unable to verify user' });
      });
    },
    function(userFound, done) {
      if (userFound) {
        bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
          done(null, userFound, resBycrypt);
        });
      } else {
        return res.status(404).json({ 'error': 'user not exist in DB' });
      }
    },
    function(userFound, resBycrypt, done) {
      if(resBycrypt) {
        done(userFound);
      } else {
        return res.status(403).json({ 'error': 'invalid password' });
      }
    }
  ], function(userFound) {
    if (userFound) {
      return res.status(201).json({
        'userId': userFound.id,
        'token': jwtUtils.generateTokenForUser(userFound)
      });
    } else {
      return res.status(500).json({ 'error': 'cannot log on user' });
    }
  });
 })
)
    module.exports = router;