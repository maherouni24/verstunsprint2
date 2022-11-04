const { any } = require('async');
var express = require('express');
var router = express.Router();
var db=require('../models');

router.post('/add',(req,res,next)=>{ 
db.commentsignal.findOne({where:{commentpostId:req.body.commentpostId,userId:req.body.userId,status:req.body.status}}).then((resp)=>{
    if(!resp){
        db.commentsignal.create(req.body).then(()=>{
            res.send("commentaire signalé")
        }).then(()=>{
        db.commentsignal.count({where:{commentpostId:req.body.commentpostId}}).then((count)=>{
            if(count>=3){
            db.commentpost.update({status:'desactive'},{where:{id:req.body.commentpostId}}).then(
                ()=>{
                  res.send('commentaire signalé definitivement')
                }
              )  
            }
        }) 
        })   
    }else{
        res.send("commentaire deja signalé")
    }
})


})


module.exports = router;