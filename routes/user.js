var express = require('express');
var bcrypt = require('bcrypt');
//var jwt = require('jsonwebtoken');
var router = express.Router();
var asyncLib  = require('async');
var jwtUtils  = require('../routes/jwt.utils');

var db=require('../models');
// Constants
const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,8}$/;

router.post('/add',(req,res)=>{
  db.user.create(req.body).then(
    (r)=>{
      res.send(r)
    }
  ).catch((e)=>{res.send(e)})
})
router.get('/fetch', function(req, res, next) {
    db.user.findAll().then((resp)=>{
      res.send(resp)
    })
  });
  router.delete('/remove/:id',(req,res)=>{
    db.user.destroy({where:{id:req.params.id}}).then(
      ()=>{
        res.send('removed')
      }
    )
    })
    router.put('/update/:id',(req,res)=>{
      db.user.update(req.body,{where:{id:req.params.id}}).then(
        ()=>{
          res.send('updated')
        }
      )
      })
    router.get('/detail/:id', function(req, res, next) {
      db.user.findOne({where:{id:req.params.id}}).then((resp)=>{
        res.send(resp)
      })
    });
    router.get('/search/:mail', function (req, res) {
      db.user.findAll({where:{mail:req.params.mail}}).then((resp)=>{
        res.send(resp)
      })
    })
    router.get('/search/:nom/:prenom', function (req, res) {
      db.user.findAll({where:{nom:req.params.nom,prenom:req.params.prenom}}).then((resp)=>{
        res.send(resp)
      })
    })
    router.post('/register',function(req, res) {
    
      // Params
      var nom = req.body.nom;
      var prenom = req.body.prenom;
      var mail    = req.body.mail;
      var psw = req.body.psw;
      var roleId= req.body.roleId;
  
      if (mail == null || nom == null || prenom == null  || psw == null || roleId == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
      }
  
      if (nom.length >= 13 || nom.length <= 3) {
        return res.status(400).json({ 'error': 'wrong nom (must be length 4 - 12)' });
      }
      if (prenom.length >= 13 || prenom.length <= 3) {
        return res.status(400).json({ 'error': 'wrong prenom (must be length 4 - 12)' });
      } 
      if (!EMAIL_REGEX.test(mail)) {
        return res.status(400).json({ 'error': 'mail is not valid' });
      }
  
      if (!PASSWORD_REGEX.test(psw)) {
        return res.status(400).json({ 'error': 'password invalid (must length 4 - 8 and include 1 number at least)' });
      } 
      asyncLib.waterfall([
        function(done) {
          db.user.findOne({
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
            bcrypt.hash(psw, 5, function( err, bcryptedPsw ) {
              done(null, userFound, bcryptedPsw);
            });
          } else {
            return res.status(409).json({ 'error': 'user already exist' });
          }
        },
        function(userFound, bcryptedPsw, done) {
          var newUser = db.user.create({
            
            nom: nom,
            prenom: prenom,
            mail: mail,
            psw: bcryptedPsw,
            roleId:roleId
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
    })
    router.post('/login',function(req, res) {
    
          // Params
          var mail    = req.body.mail;
          var psw = req.body.psw;
      
          if (mail == null ||  psw == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
          }
      
          asyncLib.waterfall([
            function(done) {
              db.user.findOne({
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
                bcrypt.compare(psw, userFound.psw, function(errBycrypt, resBycrypt) {
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
        
        
    
module.exports = router;