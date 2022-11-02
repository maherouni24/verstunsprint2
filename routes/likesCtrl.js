// Imports
var db   = require('../models');
var express = require('express');
var router = express.Router();
var jwtUtils = require('../routes/jwt.utils');
var asyncLib = require('async');

// Constants
const DISLIKED = 0;
const LIKED    = 1;

// Routes

    router.post('/sitearcheologique/:sitearcheologiqueId/vote/like',(req,res)=>{
    // Getting auth header
    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);

    // Params
    var sitearcheologiqueId = parseInt(req.params.sitearcheologiqueId);

    if (sitearcheologiqueId <= 0) {
      return res.status(400).json({ 'error': 'invalid parameters' });
    }

    asyncLib.waterfall([
      function(done) {
        db.sitearcheologique.findOne({
          where: { id: sitearcheologiqueId }
        })
        .then(function(sitearcheologiqueFound) {
          done(null, sitearcheologiqueFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify site archeologique' });
        });
      },
      function(sitearcheologiqueFound, done) {
        if(sitearcheologiqueFound) {
          db.user.findOne({
            where: { id: userId }
          })
          .then(function(userFound) {
            done(null, sitearcheologiqueFound, userFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
          });
        } else {
          res.status(404).json({ 'error': 'post already liked' });
        }
      },
      function(sitearcheologiqueFound, userFound, done) {
        if(userFound) {
          db.Like.findOne({
            where: {
              userId: userId,
              sitearcheologiqueId: sitearcheologiqueId
            }
          })
          .then(function(userAlreadyLikedFound) {
            done(null, sitearcheologiqueFound, userFound, userAlreadyLikedFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify is user already liked' });
          });
        } else {
          res.status(404).json({ 'error': 'user not exist' });
        }
      },
      function(sitearcheologiqueFound, userFound, userAlreadyLikedFound, done) {
        if(!userAlreadyLikedFound) {
            sitearcheologiqueFound.addUser(userFound, { isLike: LIKED })
          .then(function (alreadyLikeFound) {
            done(null, sitearcheologiqueFound, userFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to set user reaction' });
          });
        } else {
          if (userAlreadyLikedFound.isLike === DISLIKED) {
            userAlreadyLikedFound.update({
              isLike: LIKED,
            }).then(function() {
              done(null, sitearcheologiqueFound, userFound);
            }).catch(function(err) {
              res.status(500).json({ 'error': 'cannot update user reaction' });
            });
          } else {
            res.status(409).json({ 'error': 'message already liked' });
          }
        }
      },
      function(sitearcheologiqueFound, userFound, done) {
        sitearcheologiqueFound.update({
          likes: sitearcheologiqueFound.likes + 1,
        }).then(function() {
          done(sitearcheologiqueFound);
        }).catch(function(err) {
          res.status(500).json({ 'error': 'cannot update site archeologique like counter' });
        });
      },
    ], function(sitearcheologiqueFound) {
      if (sitearcheologiqueFound) {
        return res.status(201).json(sitearcheologiqueFound);
      } else {
        return res.status(500).json({ 'error': 'cannot update site archeologique' });
      }
    });
  });
  router.post('/sitearcheologique/:sitearcheologiqueId/vote/dislike',(req,res)=>{
   // Getting auth header
   var headerAuth  = req.headers['authorization'];
   var userId      = jwtUtils.getUserId(headerAuth);

   // Params
   var sitearcheologiqueId = parseInt(req.params.messageId);

   if (sitearcheologiqueId <= 0) {
     return res.status(400).json({ 'error': 'invalid parameters' });
   }

   asyncLib.waterfall([
    function(done) {
       db.sitearcheologique.findOne({
         where: { id: sitearcheologiqueId }
       })
       .then(function(sitearcheologiqueFound) {
         done(null, sitearcheologiqueFound);
       })
       .catch(function(err) {
         return res.status(500).json({ 'error': 'unable to verify site archeologique' });
       });
     },
     function(sitearcheologiqueFound, done) {
       if(sitearcheologiqueFound) {
         db.user.findOne({
           where: { id: userId }
         })
         .then(function(userFound) {
           done(null, sitearcheologiqueFound, userFound);
         })
         .catch(function(err) {
           return res.status(500).json({ 'error': 'unable to verify user' });
         });
       } else {
         res.status(404).json({ 'error': 'post already liked' });
       }
     },
     function(sitearcheologiqueFound, userFound, done) {
       if(userFound) {
         db.Like.findOne({
           where: {
             userId: userId,
             sitearcheologiqueId: sitearcheologiqueId
           }
         })
         .then(function(userAlreadyLikedFound) {
            done(null, sitearcheologiqueFound, userFound, userAlreadyLikedFound);
         })
         .catch(function(err) {
           return res.status(500).json({ 'error': 'unable to verify is user already liked' });
         });
       } else {
         res.status(404).json({ 'error': 'user not exist' });
       }
     },
     function(sitearcheologiqueFound, userFound, userAlreadyLikedFound, done) {
      if(!userAlreadyLikedFound) {
        sitearcheologiqueFound.addUser(userFound, { isLike: DISLIKED })
        .then(function (alreadyLikeFound) {
          done(null, sitearcheologiqueFound, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to set user reaction' });
        });
      } else {
        if (userAlreadyLikedFound.isLike === LIKED) {
          userAlreadyLikedFound.update({
            isLike: DISLIKED,
          }).then(function() {
            done(null, sitearcheologiqueFound, userFound);
          }).catch(function(err) {
            res.status(500).json({ 'error': 'cannot update user reaction' });
          });
        } else {
          res.status(409).json({ 'error': 'site archeologique already disliked' });
        }
      }
     },
     function(sitearcheologiqueFound, userFound, done) {
        sitearcheologiqueFound.update({
         likes: sitearcheologiqueFound.likes - 1,
       }).then(function() {
         done(sitearcheologiqueFound);
       }).catch(function(err) {
         res.status(500).json({ 'error': 'cannot update site archeologique like counter' });
       });
     },
   ], function(sitearcheologiqueFound) {
     if (sitearcheologiqueFound) {
       return res.status(201).json(sitearcheologiqueFound);
     } else {
       return res.status(500).json({ 'error': 'cannot update site archeologique' });
     }
   });
  })
  module.exports = router;