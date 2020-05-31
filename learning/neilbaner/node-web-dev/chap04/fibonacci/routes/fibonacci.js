const express = require('express');
const router = express.Router();

const maths = require('../maths');

router.get('/', function(req, res, next){
    if(req.query.fibonum) {
        res.render('fibonacci', {
            title: "Calculate Fibonacci Numbers",
            fibonum: req.query.fibonum,
            fiboval: maths.fibonacci(req.query.fibonum)
        });
    } else {
        res.render('fibonacci', {
            title: "Calculate Fibonacci Numbers",
            fiboval: undefined
        });
    }
});

module.exports = router;