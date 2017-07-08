var router = require('express').Router();

//private
var config = require('../privacy/config');
var email = require('../privacy/email');

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var options = {
  auth: {
    api_user: email.api_user,
    api_key: email.api_key
  }
};

 var client = nodemailer.createTransport(sgTransport(options));

// Resend
// http://localhost:3000/api/resend
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
          'username',
          'password',
          'active'];
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
                  } else if(user[0].active){
                    res.status(201).send({success: false, message: '이미 이메일을 인증하셨습니다.'});
                  } else{
                    res.status(201).send({success: true, user:user[0]});
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

router.put('/', function(req, res, next){
try{
    req.getConnection(function(err, connection) {
      if(err){
        console.error('SQL connection error : ', err);
        return next(err);
      }
      else
      {
        var updateSql = 'UPDATE users SET ? WHERE username = ?';
        var username = req.body.username;
        var token = jwt.sign({username: username}, config.secret, {expiresIn: '24h'});

        var updateValue = {
          temporarytoken: token
        };

        connection.query(updateSql, [updateValue, username], function (err, response) {

        if(err) throw err;
        else {
          var selectSql = 'SELECT ?? FROM users WHERE username = ?';
          var selectValue = [
          'username',
          'email',
          'temporarytoken'];

          connection.query(selectSql, [selectValue, username], function (err, result, next) {
            if(err){
              throw err;
            } else {
              var userInfo = {
                username: result[0].username,
                email: result[0].email,
                token: result[0].temporarytoken
              };

              var email = {
                from: 'callikalls@gmail.com',
                to: userInfo.email,
                subject:'캘리칼로스 사용자 이메일 인증',
                text: '안녕하세요'+ userInfo.username + ', 캘리칼로스에 방문해 주신걸 진심으로 환영합니다. http://localhost:3000/activate/' + userInfo.token,
                html: '안녕하세요 <strong>'+ userInfo.username + '</strong>, <br><br> 캘리칼로스에 방문해 주신걸 진심으로 환영합니다. 이메일 인증을 위해 아래의 링크를 확인해주세요. <br><a href="http://localhost:3000/#!/activate/'+userInfo.token+'">http://localhost:3000/activate/#!/</a>'
              };

              client.sendMail(email, function(err, info){
                if(err){
                  console.log(err);
                } else {
                  console.log('Message sent:' + info.response);
                }
              });

              res.status(201).send({success: true, message: '계정 활성화 링크를 '+userInfo.email+'로 보냈습니다.'});

            }
        });
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
