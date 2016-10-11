var express = require('express');
var router = express.Router();
var Advs = require('../models/advs');
var mongoose = require('mongoose');

//mongoose.connect('localhost:27017/shopping');

/* GET . */
router.get('/', function (req, res,next) {

        res.render('shop/advertise');
    });

router.post('/',function(req,res,next){

  var data = new Advs();

  data.type= req.body.typeSelect;
  data.description=req.body.descTxt;

  data.save(function(err){
    if(err)
    res.send(err);
    console.log('added to db');
  })


});

module.exports = router;
