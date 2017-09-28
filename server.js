var compression = require('compression');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(compression());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.use(express.static('image'));
app.use('/', require('./controllers/static'));

app.use('/api/banner', require('./controllers/api/banner/banner'));
app.use('/api/gallery', require('./controllers/api/gallery/gallery'));

app.use('/api/delivery', require('./controllers/api/order/delivery'));
app.use('/api/category', require('./controllers/api/admin/category'));
app.use('/api/basket', require('./controllers/api/order/basket'));
app.use('/api/makeOrder', require('./controllers/api/order/makeOrder'));
app.use('/api/itemType', require('./controllers/api/admin/itemType'));
app.use('/api/type', require('./controllers/api/admin/type'));

app.use('/api/item', require('./controllers/api/admin/item'));
app.use('/api/item_type', require('./controllers/api/admin/item_type'));

app.use('/api/createCropImage', require('./controllers/api/admin/createCropImage'));
app.use('/api/createPhotoImage', require('./controllers/api/admin/createPhotoImage'));
app.use('/api/createPhotoExplain', require('./controllers/api/admin/createPhotoExplain'));
// 전체 메뉴
app.use('/api/menu', require('./controllers/api/menu/menu'));

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
