var router = require('express').Router();

//private
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


// localhost:3000/api/resetusername
router.get('/:email', function(req, res, next){
try{

    req.getConnection(function(err, connection) {
      if(err)
      {
        console.error('SQL Connection error: ', err);
        return next(err);
      }
      else {
        if(!req.params.email){
          res.status(201).send({success:false, message: 'No e-mail was provided!'});
        }

        else {
          var selectSql = 'select email, username from users where email = ?';
          var selectValue = req.params.email;

            connection.query(selectSql, selectValue, function (err, result, next) {
            if(err){
                  res.send(err);
            }
            else {
              if(!result[0]){
                res.status(201).send({success : false, message: 'E-mail was not found'});
              }else {

                var userInfo = {
                  email:result[0].email,
                  username: result[0].username
                };

                var email = {
                  from: 'callikallos@gmail.com',
                  to: userInfo.email,
                  subject:'캘리칼로스 아이디 찾기',
                  text: '안녕하세요 '+ userInfo.username + ', 최근 당신이 요청한 아이디 찾기에 요청에 대한 답변입니다. 당신의 아이디는 : ' + userInfo.username + '입니다.',
                  html: '안녕하세요 '+ userInfo.username + ', 최근 당신이 요청한 아이디 찾기에 요청에 대한 답변입니다. 당신의 아이디는 : ' + userInfo.username + '입니다.'
                };

                client.sendMail(email, function(err, info){
                  if(err){
                    console.log(err);
                  } else {
                    console.log('Message sent:' + info.response);
                  }
                });

                res.status(201).send({success : true, message: 'Username has been sent to e-mail'});
              }

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

module.exports = router;
