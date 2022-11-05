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
router.post('/add',(req,res)=>{

    // Getting auth header
    var headerAuth  = req.headers['authorization'];
    var UtilisateurId      = jwtUtils.getUserId(headerAuth);

    // Params
    var title   = req.body.title;
    var description = req.body.description;

    if (title == null || description == null) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    if (title.length <= TITLE_LIMIT || description.length <= CONTENT_LIMIT) {
      return res.status(400).json({ 'error': 'invalid parameters' });
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
          db.Blogs.create({
            title  : title,
            description: description,
          
            likes  : 0,
            UtilisateurId : userFound.id,
            CategoryId : 1
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
        return res.status(500).json({ 'error': 'cannot post message' });
    }
});
});
router.put('/updat/:id',(req,res)=>{
  db.Blogs.update(req.body,{where:{id:req.params.id}}).then((response)=>{
    res.status(200).send(response)}).catch((err)=>{
  res.status(400).send(err)
  })
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
     
            db.Blogs.destroy({where:{id:req.params.id}}).then((response)=>{
              res.status(200).send(response)}).catch((err)=>{
            res.status(400).send(err)
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'blogs not delate' });
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
   
          db.Blogs.update({where:{id:req.params.id}}).then((response)=>{
            res.status(200).send(response)}).catch((err)=>{
          res.status(400).send(err)
          })
          .catch(function(err) {
              return res.status(500).json({ 'error': 'blogs not delate' });
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

//list
router.get('/listt',(req,res)=>{
    db.Blogs.findAll().then((response)=>{
      res.status(200).send(response)}).catch((err)=>{
    res.status(400).send(err)
    })
  });

  //searsh
  router.get('/fetchByCart/:Cart', function(req, res, next) {
    db.Blogs.findOne({ where: {
      [Op.or]: [
        { id: req.params.Cart },
        { title: req.params.Cart },
        { UtilisateurId: req.params.Cart }
        
      ]
    }}).then((resp)=>{
      res.send(resp)
    })
  });

//like
  router.put('/like',(req,res)=>{
    //Getting auth header
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
    db.Blogs.findByIdAndUpdate(req.body.BlogId,{
        $push:{likes:req.Utilisateurs._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
        
    })
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
