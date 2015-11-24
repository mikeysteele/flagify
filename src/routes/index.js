var express = require('express');
var router = express.Router();
var countries = require('../resources/reference-data/countries.json');
/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { countries: countries });
});




module.exports = router;