var router = require('express').Router();
var bcrypt =require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../../privacy/config');

// Login
// http://localhost:3000/api/authenticate
router.post('/', function(req, res, next){
try{
    req.getConnection(function(err, connection) {
      if(err){
        console.error('SQL connection error : ', err);
        return next(err);
      }
      else
      {

        if(req.body.username === null || req.body.username ==='' || req.body.password === null || req.body.password ==='')
        {
          if(req.body.username === null || req.body.username ===''){
            res.status(201).send({success: false, message: '아이디를 입력해주세요.'});
          } else if(req.body.password === null || req.body.password ===''){
            res.status(201).send({success: false, message: '비밀번호를 입력해주세요.'});
          }else {
            res.status(201).send({success: false, message: '입력된 정보가 올바르지 않습니다.'});
          }
        } else {

          var selectSql = 'SELECT ?? FROM users WHERE username = ?';
          var selectValue = [
          'user_id',
          'username',
          'password'];
          var username = req.body.username;

          connection.query(selectSql, [selectValue, username], function (err, user, next) {
            if(err){
              throw err;
            }
            if(!user[0]){
              res.status(201).send({success: false, message: '입력된 정보가 올바르지 않습니다.'});
            } else if(user[0]){
              if(user[0])
              {
                bcrypt.compare(req.body.password, user[0].password, function(err, valid){
                  if(err){
                    res.status(201).send({success: false, message: '올바른 비밀번호를 입력해주세요.'});
                  } else if(!valid){
                    res.status(201).send({success: false, message: '비밀번호가 일치하지 않습니다.'});
                  }
// 이메일 인증 시스템 오류
                  // else if(!user[0].active){
                  //   res.status(201).send({success: false, message: '이메일 인증이 확인되지않았습니다.', expired:true});
                  // }
                  else{
                    var token = jwt.sign({username:user[0].username, user_id:user[0].user_id}, config.secret, {expiresIn: '6h'});
                    res.status(201).send({success: true, message: '안녕하세요.'+user[0].username+'님, 접속 중입니다.', token:token});
                  }
                });
              }

// 부서적인 오류 점검
              else {
                res.status(201).send({success: false, message: '입력된 정보가 올바르지 않습니다.'});
              }

            } else {
              res.status(201).send({success: false, message: '입력된 정보가 올바르지 않습니다.'});
            }
          });
        }

      }
    });
  }
    catch(ex){
    console.log("Internal error: " +ex);
    return next(ex);
    }
});

module.exports= router;
