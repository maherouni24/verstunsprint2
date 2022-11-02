var express=require('express');
var router = express.Router();
var db=require('../models');


router.post('/add',(req,res)=>{
   db.dislike.findOne({where:{sitearcheologiqueId: req.body.sitearcheologiqueId,userId:req.body.userId}}).then((resp)=>{
    if(!resp){
        db.like.findOne({where:{sitearcheologiqueId: req.body.sitearcheologiqueId,userId:req.body.userId}}).then((resp)=>{
        if(!resp){
            db.dislike.create({
                sitearcheologiqueId :req.body.sitearcheologiqueId,
                userId:req.body.userId 
                }).then(
                    (p)=>{
                        res.send(p);
                    }
                )
        }else{
            db.like.destroy({where:{sitearcheologiqueId: req.body.sitearcheologiqueId,userId:req.body.userId} }).then(
                ()=>{
                    res.send('like removed and dislike');
                }
            ) 
            db.dislike.create({
                sitearcheologiqueId :req.body.sitearcheologiqueId,
                userId:req.body.userId 
                }).then(
                    (p)=>{
                        res.send(p);
                    }
                ) 
        }    
        })    
    }
    else{
        res.send("already disliked")
    }
   })
});
router.delete('/remove/:id',(req,res)=>{
    db.dislike.destroy({where:{id:req.params.id} }).then(
        ()=>{
            res.send('dislike removed');
        }
    );
});
router.get('/detail/:id',function(req,res,next){
    db.dislike.findAndCountAll({where:{sitearcheologiqueId:req.params.id} }).then((resp)=>{
        res.send(resp);
    });
});

module.exports = router;