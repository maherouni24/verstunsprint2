var express=require('express');
var router = express.Router();
var db=require('../models');


router.post('/add',(req,res)=>{
   db.dislikepost.findOne({where:{postId: req.body.postId,userId:req.body.userId}}).then((resp)=>{
    if(!resp){
        db.likepost.findOne({where:{postId: req.body.postId,userId:req.body.userId}}).then((resp)=>{
        if(!resp){
            db.dislikepost.create({
                spostId :req.body.postId,
                userId:req.body.userId 
                }).then(
                    (p)=>{
                        res.send(p);
                    }
                )
        }else{
            db.likepost.destroy({where:{postId: req.body.postId,userId:req.body.userId} }).then(
                ()=>{
                    res.send('like for post removed and dislike');
                }
            ) 
            db.dislikepost.create({
                postId :req.body.postId,
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
        res.send("already post disliked")
    }
   })
});
router.delete('/remove/:id',(req,res)=>{
    db.dislikepost.destroy({where:{id:req.params.id} }).then(
        ()=>{
            res.send('dislike for post removed');
        }
    );
});
router.get('/detail/:id',function(req,res,next){
    db.dislikepost.findAndCountAll({where:{postId:req.params.id} }).then((resp)=>{
        res.send(resp);
    });
});

module.exports = router;