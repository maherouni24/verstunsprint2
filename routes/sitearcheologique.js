var express = require('express');
var router = express.Router();
var db=require('../models');
const { Op } = require("sequelize");

router.post('/add',(req,res)=>{
  db.sitearcheologique.create(req.body).then(
    (r)=>{
      res.send(r)
    }
  ).catch((e)=>{res.send(e)})
})
router.get('/fetch', function(req, res, next) {
    db.sitearcheologique.findAll().then((resp)=>{
      res.send(resp)
    })
  });
  router.delete('/remove/:id',(req,res)=>{
    db.sitearcheologique.destroy({where:{id:req.params.id}}).then(
      ()=>{
        res.send('removed')
      }
    )
    })
    router.put('/update/:id',(req,res)=>{
      db.sitearcheologique.update(req.body,{where:{id:req.params.id}}).then(
        ()=>{
          res.send('updated')
        }
      )
      })
    router.get('/detail/:id', function(req, res, next) {
      db.sitearcheologique.findOne({where:{id:req.params.id}}).then((resp)=>{
        res.send(resp)
      })
    });
    //router.get('/search/:gouvernoratS', function (req, res) {
      //db.sitearcheologique.findAll({where:{gouvernoratS:req.params.gouvernoratS}}).then((resp)=>{
        //res.send(resp)
      //})
    //})
    
    //router.get('/search/:gouvernoratS/:nomS/:userId', function (req, res) {
      //db.sitearcheologique.findAll({where:{gouvernoratS:req.params.gouvernoratS,nomS:req.params.nomS,userId:req.params.userId}}).then((resp)=>{
        //res.send(resp)
      //})
    //})
     //recherche multiple :3   
    router.get('/searchBy/:c',function(req,res){
    db.sitearcheologique.findOne({ where:{
     [Op.or]:[
      {nomS:req.params.c},
      {gouvernoratS:req.params.c},
      {userId:req.params.c},
     ] 
    }}).then((resp)=>{
      res.render(resp)
    })
    });


module.exports = router;