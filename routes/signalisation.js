const { any } = require('async');
var express = require('express');
var router = express.Router();
var db=require('../models');

router.post('/add',(req,res,next)=>{ 
db.signalisation.findOne({where:{postId:req.body.postId,userId:req.body.userId,status:req.body.status}}).then((resp)=>{
    if(!resp){
        db.signalisation.create(req.body).then(()=>{
            res.send("post signalé")
        }).then(()=>{
        db.signalisation.count({where:{postId:req.body.postId}}).then((count)=>{
            if(count>=3){
            db.post.update({status:'desactive'},{where:{id:req.body.postId}}).then(
                ()=>{
                  res.send('post signalé definitivement')
                }
              )  
            }
        }) 
        })   
    }else{
        res.send("post deja signalé")
    }
})


})


module.exports = router;