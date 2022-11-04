var express = require('express');
var router = express.Router();
var db=require('../models');
//const { Op } = require("sequelize");

router.post('/add',(req,res)=>{
  db.post.create(req.body).then(
    (r)=>{
      res.send(r)
    }
  ).catch((e)=>{res.send(e)})
})
router.get('/fetch', function(req, res, next) {
    db.post.findAll().then((resp)=>{
      res.send(resp)
    })
  });
  router.delete('/remove/:id',(req,res)=>{
    db.post.destroy({where:{id:req.params.id}}).then(
      ()=>{
        res.send('post removed')
      }
    )
    })
    router.put('/update/:id',(req,res)=>{
      db.post.update(req.body,{where:{id:req.params.id}}).then(
        ()=>{
          res.send('updated')
        }
      )
      })
    router.get('/detail/:id', function(req, res, next) {
      db.post.findOne({where:{id:req.params.id}}).then((resp)=>{
        res.send(resp)
      })
    });
    
            
module.exports = router;