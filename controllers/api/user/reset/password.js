var router = require('express').Router();

//private
var config = require('../../privacy/config');
var email = require('../../privacy/email');

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



// locolhost:3000/api/resetpassword/:token
router.get('/:token', function(req, res, next){
try{
    req.getConnection(function(err, connection) {
      if(err){
        console.error('SQL connection error : ', err);
        return next(err);
      }
      else
      {

        var SelectSql = 'select username, email from users where resettoken = ?';
        var token = req.params.token;
        connection.query(SelectSql,  token, function (err, result) {

        if(err) throw err;
        else {
          jwt.verify(token, config.secret, function(err, decoded){
            if(err){
              res.json({success:false, message:'Password link has expired!'});
            } else {
              if(!result[0]){
                res.json({success:false, message:'Password link has expired!'});
              }else {
                res.json({success:true, user:result});
              }
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

// locolhost:3000/api/resetpassword/
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
          resettoken: token
        };


        connection.query(updateSql, [updateValue, username], function (err, response) {

        if(err) throw err;
        else {

          var selectSql = 'SELECT ?? FROM users WHERE username = ?';
          var selectValue = [
          'username',
          'email',
          'active',
          'resettoken'];

          connection.query(selectSql, [selectValue, username], function (err, result, next) {
            if(err){
              throw err;
            } else {
              if(!result[0]) {
                res.status(201).send({success:false, message:'Username was not found'});
              } else if(!result[0].active){
                res.status(201).send({success:false, message:'Account has not been activated'});
              }else {

                var userInfo = {
                  username: result[0].username,
                  email: result[0].email,
                  token: result[0].resettoken
                };


                var email = {
                  from: 'callikallos@gmail.com',
                  to: userInfo.email,
                  subject:'캘리칼로스 비밀번호 변경',
                  text: '안녕하세요 '+ userInfo.username + '님, 최근 요청한 비밀번호 변경관련한 이메일 입니다. 비밀번호 변경을 위해 아래의 링크를 클릭해주세요.<br><br><a href="http://localhost:3000/#!/reset/'+ userInfo.token+'">http://localhost:3000/#!/reset/</a>',
                  html: '안녕하세요 <strong>'+ userInfo.username + '</strong>, <br><br> 최근 요천한 비밀번호 변경 관련 이메일입니다. 비밀번호 변경을 위해 아래의 링크를 확인해주세요. <br><br><a href="http://localhost:3000/#!/reset/'+userInfo.token+'">http://localhost:3000/reset/</a>'

                };

                client.sendMail(email, function(err, info){
                  if(err){
                    console.log(err);
                  } else {
                    console.log('Message sent:' + info.response);
                  }
                });

                res.status(201).send({success: true, message: '비밀번호 변경을 위한 이메일 확인해주세요.'});


              }


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
