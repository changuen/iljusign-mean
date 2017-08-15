# 일주사인(ILJUSIGN) 프로젝트
간판 및 시안소재와 관련된 부자재를 판매하는 쇼핑몰 웹 어플리케이션

# 사용된 오픈소스
angular-ui.router, angular-ui-cropper, summernote.js, nodemailer, nodemailer-sendgrid, angular-ui-bootstrap, 다음 우편주소 API

# 웹을 구동시키기위해 읽어 볼 것
개인정보 보호를 위해 데이터베이스 정보, nodemailer-sendrid, json-webtoken을 모듈화하여 분리
../mysql.js, ../controllers/api/privacy/email.js, ../controllers/api/privacy/config.js 파일 필요

<pre><code>
mysql.js
module.exports = {
  host     : 'localhost' ,
  user     : 'mysql 아이디',
  password : 'mysql 비밀번호',
  database : '데이터베이스 이름'
};

email.js
module.exports = {
  api_user : 'sendgrid 아이디',
  api_key : 'sendgrid 비밀번호'
};

config.js
module.exports = {
   secret: '사용자 정의 문자'
};
</code></pre>
