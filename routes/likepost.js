var express=require('express');
var router = express.Router();
var db=require('../models');


router.post('/add',(req,res)=>{
    db.likepost.findOne({where:{postId: req.body.postId,userId:req.body.userId}}).then((resp)=>{
        if(!resp){
            db.dislikepost.findOne({where:{postId: req.body.postId,userId:req.body.userId}}).then((resp)=>{
            if(!resp){
                db.likepost.create({
                    postId :req.body.postId,
                    userId:req.body.userId 
                    }).then(
                        (p)=>{
                            res.send(p);
                        }
                    )
            }else{
                db.dislikepost.destroy({where:{postId: req.body.postId,userId:req.body.userId} }).then(
                    ()=>{
                        res.send('dislike for this post removed and like');
                    }
                ) 
                db.likepost.create({
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
            res.send("post already liked")
        }
       })
});
router.delete('/remove/:id',(req,res)=>{
    db.likepost.destroy({where:{id:req.params.id} }).then(
        ()=>{
            res.send('like for post removed');
        }
    );
});
router.get('/detail/:id',function(req,res,next){
    db.likepost.findAndCountAll({where:{postId:req.params.id} }).then((resp)=>{
        res.send(resp);
    });
});

module.exports = router;