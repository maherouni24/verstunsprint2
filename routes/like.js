var express=require('express');
var router = express.Router();
var db=require('../models');


router.post('/add',(req,res)=>{
    db.like.findOne({where:{sitearcheologiqueId: req.body.sitearcheologiqueId,userId:req.body.userId}}).then((resp)=>{
        if(!resp){
            db.dislike.findOne({where:{sitearcheologiqueId: req.body.sitearcheologiqueId,userId:req.body.userId}}).then((resp)=>{
            if(!resp){
                db.like.create({
                    sitearcheologiqueId :req.body.sitearcheologiqueId,
                    userId:req.body.userId 
                    }).then(
                        (p)=>{
                            res.send(p);
                        }
                    )
            }else{
                db.dislike.destroy({where:{sitearcheologiqueId: req.body.sitearcheologiqueId,userId:req.body.userId} }).then(
                    ()=>{
                        res.send('dislike removed and like');
                    }
                ) 
                db.like.create({
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
            res.send("already liked")
        }
       })
});
router.delete('/remove/:id',(req,res)=>{
    db.like.destroy({where:{id:req.params.id} }).then(
        ()=>{
            res.send('like removed');
        }
    );
});
router.get('/detail/:id',function(req,res,next){
    db.like.findAndCountAll({where:{sitearcheologiqueId:req.params.id} }).then((resp)=>{
        res.send(resp);
    });
});

module.exports = router;