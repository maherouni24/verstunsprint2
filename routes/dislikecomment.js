var express=require('express');
var router = express.Router();
var db=require('../models');


router.post('/add',(req,res)=>{
    db.dislikecomment.findOne({where:{commentId: req.body.commentId,userId:req.body.userId}}).then((resp)=>{
        if(!resp){
            db.likecomment.findOne({where:{commentId: req.body.commentId,userId:req.body.userId}}).then((resp)=>{
            if(!resp){
                db.dislikecomment.create({
                    commentId :req.body.commentId,
                    userId:req.body.userId 
                    }).then(
                        (p)=>{
                            res.send(p);
                        }
                    )
            }else{
                db.likecomment.destroy({where:{commentId: req.body.commentId,userId:req.body.userId} }).then(
                    ()=>{
                        res.send('like for comment removed and dislike for comment');
                    }
                ) 
                db.dislikecomment.create({
                    commentId :req.body.commentId,
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
            res.send("already comment disliked")
        }
       })
});
router.delete('/remove/:id',(req,res)=>{
    db.dislikecomment.destroy({where:{id:req.params.id} }).then(
        ()=>{
            res.send('comment dislike removed');
        }
    );
});
router.get('/detail/:id',function(req,res,next){
    db.dislikecomment.findAndCountAll({where:{commentId:req.params.id} }).then((resp)=>{
        res.send(resp);
    });
});

module.exports = router;