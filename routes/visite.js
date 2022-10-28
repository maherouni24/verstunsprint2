var express = require('express');
var router = express.Router();


var db=require('../models');


router.post('/add',(req,res)=>{
  db.visite.create(req.body).then(
    (r)=>{
      res.send(r)
    }
  ).catch((e)=>{res.send(e)})
})
router.get('/fetch', function(req, res, next) {
    db.visite.findAll().then((resp)=>{
      res.send(resp)
    })
  });
  router.delete('/remove/:id',(req,res)=>{
    db.visite.destroy({where:{id:req.params.id}}).then(
      ()=>{
        res.send('removed')
      }
    )
    })
    router.put('/update/:id',(req,res)=>{
      db.visite.update(req.body,{where:{id:req.params.id}}).then(
        ()=>{
          res.send('updated')
        }
      )
      })
    router.get('/detail/:id', function(req, res, next) {
      db.visite.findOne({where:{id:req.params.id}}).then((resp)=>{
        res.send(resp)
      })
    });
    router.get('/search/:sitearcheologiqueId', function (req, res) {
        db.visite.findAll({where:{sitearcheologiqueId:req.params.sitearcheologiqueId}}).then((resp)=>{
            res.send(resp)
          })
      })

module.exports = router;