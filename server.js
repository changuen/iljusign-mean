var compression = require('compression');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(compression());
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.use(express.static('image'));
app.use('/', require('./controllers/static'));


app.use('/api/item', require('./controllers/api/item'));
app.use('/api/createCropImage', require('./controllers/api/createCropImage'));
app.use('/api/createPhotoImage', require('./controllers/api/createPhotoImage'));
app.use('/api/createPhotoExplain', require('./controllers/api/createPhotoExplain'));
// 전체 메뉴
app.use('/api/header', require('./controllers/api/menu/header'));

// middleware
app.use('/api/me', require('./controllers/api/user/me'));
app.use('/api/permission', require('./controllers/api/user/permission'));

// user/reset
app.use('/api/resetusername', require('./controllers/api/user/reset/username'));
app.use('/api/resetpassword', require('./controllers/api/user/reset/password'));
app.use('/api/savepassword', require('./controllers/api/user/reset/savepassword'));

// Login
app.use('/api/authenticate', require('./controllers/api/user/login/authenticate'));

// Register
app.use('/api/users', require('./controllers/api/user/register/users'));

// 부서적인 것들/
app.use('/api/renewToken', require('./controllers/api/user/renewToken'));
app.use('/api/activate', require('./controllers/api/user/activate'));
app.use('/api/resend', require('./controllers/api/user/resend'));

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('layouts/app.html', { root: __dirname });
});

app.listen(3000, function () {
    console.log('Server listening on', 3000);
});
