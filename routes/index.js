var express = require('express');
var router = express.Router();

//var Product = require('../models/product');
var Advertise = require('../models/advs');

/* GET home page. */
router.get('/', function (req, res, next) {
    Advertise.find(function (err, docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', {title: 'Cloud 2016', products: productChunks});
    });
});

module.exports = router;
