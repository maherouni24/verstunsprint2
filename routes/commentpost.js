var express=require('express');
var router = express.Router();
var db=require('../models');


router.post('/add',(req,res)=>{
    db.commentpost.create({
        content:req.body.content,
        postId :req.body.postId,
        userId:req.body.userId 
        }).then(
            (p)=>{
                res.send(p);
            }
        )
})
router.delete('/remove/:id',(req,res)=>{
    db.commentpost.destroy({where:{id:req.params.id} }).then(
        ()=>{
            res.send('comment for post removed');
        }
    );
});
router.put('/update/:id',(req,res)=>{
    db.commentpost.update(req.body,{where:{id:req.params.id}}).then(
      ()=>{
        res.send('comment for post updated')
      }
    )
    })
router.get('/comments/:id',function(req,res,next){
    db.commentpost.findAndCountAll({where:{postId:req.params.id} }).then((resp)=>{
        res.send(resp);
    });
});

module.exports = router;