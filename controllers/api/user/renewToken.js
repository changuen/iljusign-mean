var router = require('express').Router();
var config = require('../privacy/config');
var jwt = require('jsonwebtoken');


router.get('/:username', function(req, res, next){
try{
    req.getConnection(function(err, connection) {
      if(err){
        console.error('SQL connection error : ', err);
        return next(err);
      }
      else
      {

        var selectSql = 'SELECT ?? FROM users WHERE username = ?';
        var selectValue = [
        'username',
        'user_id',
        'password',
        'permission',
        'active'];
        var username = req.params.username;

        connection.query(selectSql, [selectValue, username], function (err, user, next) {
          if(err){
            throw err;
          } else {
            if(!user[0]){
              res.json({success:false, message:'No user was found'});
            } else {
              var newToken = jwt.sign({username: user[0].username, user_id:user[0].user_id, permission:user[0].permission}, config.secret, {expiresIn:'2h'});
              res.json({success:true, token:newToken});
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
