var express=require('express');
var router = express.Router();
var db=require('../models');


router.post('/add',(req,res)=>{
    db.likecomment.findOne({where:{commentId: req.body.commentId,userId:req.body.userId}}).then((resp)=>{
        if(!resp){
            db.dislikecomment.findOne({where:{commentId: req.body.commentId,userId:req.body.userId}}).then((resp)=>{
            if(!resp){
                db.likecomment.create({
                    commentId :req.body.commentId,
                    userId:req.body.userId 
                    }).then(
                        (p)=>{
                            res.send(p);
                        }
                    )
            }else{
                db.dislikecomment.destroy({where:{commentId: req.body.commentId,userId:req.body.userId} }).then(
                    ()=>{
                        res.send('dislike for comment removed and like for comment');
                    }
                ) 
                db.likecomment.create({
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
            res.send("already comment liked")
        }
       })
});
router.delete('/remove/:id',(req,res)=>{
    db.likecomment.destroy({where:{id:req.params.id} }).then(
        ()=>{
            res.send('comment like removed');
        }
    );
});
router.get('/detail/:id',function(req,res,next){
    db.likecomment.findAndCountAll({where:{commentId:req.params.id} }).then((resp)=>{
        res.send(resp);
    });
});

module.exports = router;