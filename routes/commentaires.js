var express = require('express');
var router = express.Router();

var db=require('../models');

var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils');
const { Op } = require("sequelize");

// Constants
const TITLE_LIMIT   = 2;
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT   = 50;

// add
router.post('/addcomment',(req,res)=>{

    // Getting auth header
    var headerAuth  = req.headers['authorization'];
    var UtilisateurId      = jwtUtils.getUserId(headerAuth);

    // Params
    var commentaire   = req.body.commentaire ;
    

    if (commentaire  == null ) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

   

    asyncLib.waterfall([
      function(done) {
        db.Utilisateurs.findOne({
          where: { id: UtilisateurId }
        })
        .then(function(userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, done) {
        if(userFound) {
          db.Commentaires.create({
            commentaire   : commentaire ,
            likes  : 0,
            UtilisateurId : userFound.id,
            BlogId : 3,
          })
          .then(function(newMessage) {
            done(newMessage);
          });
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      },
    ], function(newMessage) {
      if (newMessage) {
        return res.status(201).json(newMessage);
      } else {
        return res.status(500).json({ 'error': 'cannot post commentaire' });
    }
});
});

//delete
router.delete('/remove/:id',(req,res)=>{

  // Getting auth header
  var headerAuth  = req.headers['authorization'];
  var UtilisateurId      = jwtUtils.getUserId(headerAuth);

  // Params
 

  asyncLib.waterfall([
    function(done) {
      db.Utilisateurs.findOne({
        where: { id: UtilisateurId }
      })
      .then(function(userFound) {
        done(null, userFound);
      })
      .catch(function(err) {
        return res.status(500).json({ 'error': 'unable to verify user' });
      });
    },
    function(userFound, done) {
      if(userFound) {
   
          db.Commentaires.destroy({where:{id:req.params.id}}).then((response)=>{
            res.status(200).send(response)}).catch((err)=>{
          res.status(400).send(err)
          })
          .catch(function(err) {
              return res.status(500).json({ 'error': 'commentaires not delate' });
            });
          }
      
    },
  ], function(newMessage) {
    if (newMessage) {
      return res.status(201).json(newMessage);
    } else {
      return res.status(500).json({ 'error': 'cannot post commentaires' });
  }
});
});

//list
router.get('/listt',(req,res)=>{
  db.Commentaires.findAll().then((response)=>{
    res.status(200).send(response)}).catch((err)=>{
  res.status(400).send(err)
  })
});

//searsh
router.get('/fetchByCart/:Cart', function(req, res, next) {
  db.Commentaires.findOne({ where: {
    [Op.or]: [
      { id: req.params.Cart },
      { commentaire: req.params.Cart },
      { UtilisateurId: req.params.Cart }
      
    ]
  }}).then((resp)=>{
    res.send(resp)
  })
});



//update
router.put('/update/:id',(req,res)=>{

  // Getting auth header
  var headerAuth  = req.headers['authorization'];
  var UtilisateurId      = jwtUtils.getUserId(headerAuth);

  // Params
 

  asyncLib.waterfall([
    function(done) {
      db.Utilisateurs.findOne({
        where: { id: UtilisateurId }
      })
      .then(function(userFound) {
        done(null, userFound);
      })
      .catch(function(err) {
        return res.status(500).json({ 'error': 'unable to verify user' });
      });
    },
    function(userFound, done) {
      if(userFound) {
   
          db.Commentaires.update({where:{id:req.params.id}}).then((response)=>{
            res.status(200).send(response)}).catch((err)=>{
          res.status(400).send(err)
          })
          .catch(function(err) {
              return res.status(500).json({ 'error': 'commentaires not updated' });
            });
          }
      
    },
  ], function(newMessage) {
    if (newMessage) {
      return res.status(201).json(newMessage);
    } else {
      return res.status(500).json({ 'error': 'cannot post message' });
  }
});
});
module.exports = router;