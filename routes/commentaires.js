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

module.exports = router;