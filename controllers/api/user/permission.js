var router = require('express').Router();

var router = require('express').Router();
var config = require('../privacy/config');
var jwt = require('jsonwebtoken');


router.get('/', function(req, res, next){
try{
    req.getConnection(function(err, connection) {
      if(err){
        console.error('SQL connection error : ', err);
        return next(err);
      }
      else
      {

        var selectSql = 'select ?? from users where user_id = ?';
        var selectValue = 'permission';
        var user_id = req.decoded.user_id;
        connection.query(selectSql, [selectValue, user_id], function (err, result, next) {
          if(err){
            throw err;
          } else {
            if(!result){
              res.send({success:true, message: '권한 확인 실패!'});
            } else {
              res.send({success:true, message: '권한 확인 성공!', permission : result[0].permission});
            }
          }
        });
      }
    });
  }
    catch(ex){
    console.log("Internal error: " +ex);
    return next(ex);
    }
});

module.exports= router;
