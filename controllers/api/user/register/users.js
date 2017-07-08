// 기존 사용자의 정보를 얻고 새로운 사용자를 생성하는 두가지 동작을 수행
var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

//private
var config = require('../../privacy/config');
var email = require('../../privacy/email');

var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var options = {
  auth: {
    api_user: email.api_user,
    api_key: email.api_key
  }
};
 var client = nodemailer.createTransport(sgTransport(options));


// http://localhost:3000/api/users
// USER REGISTERATION ROUTE
router.post('/', function(req, res, next){
  try{
      req.getConnection(function(err, connection) {
        if(err)
        {
          console.error('SQL Connection error: ', err);
          return next(err);
        }
        else {

          if(req.body.username === null || req.body.username === '' || req.body.username === undefined ||
          req.body.password === null || req.body.password === '' || req.body.password === undefined ||
          req.body.email === null || req.body.email === '' || req.body.email === undefined){
            res.status(201).send({success:false, message:'정보를 모두 입력해주세요.'});
          }else {
            bcrypt.hash(req.body.password, 10, function(err, hash){
            if(err) {
              return next(err);
            }
            else {
            var password = hash;

            var insertSql = 'INSERT INTO users set ?';
            // var tempToken = jwt.sign({username:req.body.username, email:req.body.email}, config.secret, {expiresIn: '24h'});

            var insertValue = {
                                username: req.body.username,
                                password: password,
                                email:req.body.email,
                                // temporarytoken:tempToken
                               };

                connection.query(insertSql, insertValue, function (error, results, next) {

                // databases에서  select 문으로 중복된 사용자 찾아야함.
                    if(error){
                      if(error.errno === 1062){
                        res.status(201).send({success: false, message: '등록된 아이디 또는 이메일이 존재합니다.'});
                      } else {
                        res.status(201).send(error);
                      }
                    } else{
// 이메일 인증 시스텝 보류
                      // var email = {
                      //   from: 'callikallos@gmail.com',
                      //   to: req.body.email,
                      //   subject:'캘리칼로스 이메일 인증관련 메일입니다.',
                      //   text: '안녕하세요 '+ req.body.username + ', 캘리칼로스에 가입하신걸 환영합니다. http://callikallos/activate/' + insertValue.temporarytoken,
                      //   html: '안녕하세요 <strong>'+ req.body.username + '</strong>, <br><br>캘리칼로스에 회원가입하신걸 진심으로 감사드립니다.<br> 이메일 인증을 위해 아래의 링크를 클릭해 회원가입을 완료해주세요.<br><a href="http://localhost:3000/#!/activate/'+insertValue.temporarytoken+'">http://localhost:3000/activate</a>'
                      // };
                      //
                      // client.sendMail(email, function(err, info){
                      //   if(err){
                      //     console.log(err);
                      //   } else {
                      //     console.log('Message sent:' + info.response);
                      //   }
                      // });

                      res.status(201).send({success: true, message: '아이디가 생성되었습니다.'});
                    }
                });
              }
            });
          }


        }
    });
  }
  catch(ex){
    console.error("Internal error: "+ex);
    return next(ex);
  }
});


// http://localhost:3000/api/users
// USER resetPermission
router.put('/', function(req, res, next){
  try{
      req.getConnection(function(err, connection) {
        if(err)
        {
          console.error('SQL Connection error: ', err);
          return next(err);
        }
        else {
          var updateSql = 'update users set ? where user_id = ?';
          var updateValue = {
            permission : 'artist',
          };
          var user_id = req.body.user_id;

          connection.query(updateSql, [updateValue, user_id], function(err, results, next){
            if(err) throw err;
            else {

              var insertSql = 'insert into my_profile set ?';
              var inserValue = {
                user_id: user_id
              };

              connection.query(insertSql, inserValue, function(err,results, next){
                if(err) throw err;
                else {
                  res.json({success:true, message:'캘리칼로스 작가 등록되었습니다.'});
                }
              });
            }
          });
          }
        });
        }
  catch(ex){
    console.error("Internal error: "+ex);
    return next(ex);
  }
});


// http://localhost:3000/api/users
// USER resetPermission
router.get('/:username', function(req, res, next){
  try{
      req.getConnection(function(err, connection) {
        if(err)
        {
          console.error('SQL Connection error: ', err);
          return next(err);
        }
        else {
          var selectValue = req.params.username;
          var selectSql = 'select permission from users where username = ?';

          connection.query(selectSql, selectValue, function(err, results, next){
            if(err) throw err;
            else {
              if(!results[0]){
                res.json({success:false, message:'잘 못된 정보를 입력하셨습니다.'});
              } else {
                if(results[0].permission === 'artist'){
                  res.json({success:true, message:'캘리칼로스 작가로 등록되어있습니다.'});
                } else {
                  res.json({success:false, message:'잘 못된 정보를 입력하셨습니다.'});
                }
              }

            }
          });
          }
        });
        }
  catch(ex){
    console.error("Internal error: "+ex);
    return next(ex);
  }
});



module.exports = router;
