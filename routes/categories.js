var express = require('express');
var router = express.Router();


var db=require('../models');
router.post('/add',(req,res)=>{
var categorie = req.body.categorie;

if (categorie == null ) {
  return res.status(400).json({ 'error': 'missing parameters' });
}

if (categorie.length >= 20 || categorie.length <= 4) {
  return res.status(400).json({ 'error': 'wrong categorie(must be length 5 - 19)' });
}

  db.Categories.create(req.body).then((response)=>{
    res.status(200).send(response)})
})
module.exports = router;
