var express=require('express');
var router = express.Router();
var db=require('../models');


router.post('/add',(req,res)=>{
    db.comment.create({
        content:req.body.content,
        sitearcheologiqueId :req.body.sitearcheologiqueId,
        userId:req.body.userId 
        }).then(
            (p)=>{
                res.send(p);
            }
        )
})
router.delete('/remove/:id',(req,res)=>{
    db.comment.destroy({where:{id:req.params.id} }).then(
        ()=>{
            res.send('comment removed');
        }
    );
});
router.get('/comments/:id',function(req,res,next){
    db.comment.findAndCountAll({where:{sitearcheologiqueId:req.params.id} }).then((resp)=>{
        res.send(resp);
    });
});

module.exports = router;