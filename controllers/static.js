// privacy
var mysqlInfo = require('../mysql');
var config = require('./api/privacy/config');
var express = require('express');
var router = express.Router();
var morgan = require('morgan');
var mysql = require('mysql');
var connection = require('express-myconnection'); // express-myconnection module
var bodyParser = require('body-Parser');
var jwt = require('jsonwebtoken');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
router.use(morgan('dev'));

router.use(express.static(__dirname + '/../assets'));
router.use(express.static(__dirname + '/../templates'));
router.use(express.static(__dirname + '/../node_modules'));

router.use(connection(mysql, {
  host     : mysqlInfo.host,
  user     : mysqlInfo.user,
  password : mysqlInfo.password,
  database : mysqlInfo.database
}, 'single'));

router.use(function(req, res, next){
  var token = req.body.token || req.body.query || req.headers['x-access-token'];
  if(token){
    jwt.verify(token, config.secret, function(err, decoded){
      if(err){
        res.json({success:false, message:'Token invalid'});
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    next();
  }
});

module.exports = router;
