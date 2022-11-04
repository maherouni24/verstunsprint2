var express=require('express');
var router = express.Router();
var db=require('../models');


router.post('/participate',(req,res)=>{
    db.participant.findOne({where:{visiteId: req.body.visiteId,userId:req.body.userId}}).then((resp)=>{
        if(!resp){
    db.participant.create({
        visiteId :req.body.visiteId,
        userId:req.body.userId 
        }).then(
            (p)=>{
                res.send(p);
            }
        )}else{
            res.send("already participed")
        }
})
})
router.delete('/remove/:id',(req,res)=>{
    db.participant.destroy({where:{id:req.params.id} }).then(
        ()=>{
            res.send('participation removed');
        }
    );
});
router.get('/participants/:id',function(req,res,next){
    db.participant.findAndCountAll({where:{visiteId:req.params.id} }).then((resp)=>{
        res.send(resp);
    });
});

module.exports = router;