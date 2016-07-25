var express = require('express');
var router = express.Router();
var data = require('./geoquery');
var path    = require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
    //var appTitle="Tweets Events";
    var appTitle="Road Safety";//France version
    res.render('timeviewtool', { title: appTitle});
});

router.get('/hours', function(req, res, next) {
    res.render('hours', { title: 'Tweets hours cycle'});
});

router.get('/yearview', function(req, res, next) {
    res.render('yearview', { title: 'Year view'});
});

router.get('/timeline', function(req, res, next) {
    res.render('timeline', { title: 'Tweets timeline - accumulative'});
});

router.get('/map', function(req, res, next) {
    res.render('map', { title: 'Tweets map'});
});

router.get('/mapDensity', function(req, res, next) {
    res.render('mapDensity', { title: 'Tweets density map'});
});

router.get('/coordinated', function(req, res, next) {
    res.render('coordinatedV1', { title: 'Coordinated view'});
});

router.get('/coordinated2', function(req, res, next) {
    res.render('timeviewtool', { title: 'Coordinated view'});
});

router.get('/webapi', function(req, res, next) {
    res.render('webapi', { title: 'Web API'});
});
module.exports = router;