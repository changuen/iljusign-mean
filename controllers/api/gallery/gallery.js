var router = require('express').Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './assets/images/items/gallery');
    },
    filename: function(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
            var err = new Error();
            err.code = 'filetype';
            return cb(err);
        } else {
            cb(null, Date.now() + '_' +file.originalname);
        }
    }
});

var upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }
}).single('myfile');

// 유저 정보 중 이미지 업로드 API // myProfile.js
// 서버에 저장하지 않고 Path만 저장
router.patch('/', function(req, res, next){
try{

    req.getConnection(function(err, connection) {
      if(err)
      {
        console.error('SQL Connection error: ', err);
        return next(err);
      }
      else {
				upload(req, res, function(err) {
		        if (err) {
		            if (err.code === 'LIMIT_FILE_SIZE') {
                  res.json({ success: false, message: '5MB이하의 파일 사이즈를 권장합니다.'});
		            } else if (err.code === 'filetype') {
                  res.json({ success: false, message: 'png, jpeg, jpg 확장자를 권장합니다.' });
		            } else {
                  res.json({ success: false, message: '파일을 업로드 불가합니다.' });
		            }
		        } else {
		            if (!req.file) {
                  res.json({ success: false, message: '선택된 파일이 없습니다.' });
		            } else {

                  var dbfilePath = '/images/items/gallery/';
                  var item_path = dbfilePath + req.file.filename;

                  res.json({ success: true, message: '이미지를 업로드 하였습니다.', image_path: item_path });

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

router.get('/', function(req, res, next){
try{

    req.getConnection(function(err, connection) {
      if(err)
      {
        console.error('SQL Connection error: ', err);
        return next(err);
      }
      else {
        var selectSql = 'select * from gallery';
          connection.query(selectSql,  function (err, result, next) {
          if(err){
                res.send(err);
          }
          else {
            if(!result){
              res.json({success:false, message:'정보를 불러오지 못 하였습니다.'});
            } else {
              res.json({success:true, message:'정보를 불러왔습니다.', galleryData: result});
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

router.post('/', function(req, res, next){
try{

    req.getConnection(function(err, connection) {
      if(err)
      {
        console.error('SQL Connection error: ', err);
        return next(err);
      }
      else {

        var insertSql = 'INSERT INTO gallery set ?';

        var insertValue = {
          title: req.body.title,
          image_path: req.body.imagePath
        };

        connection.query(insertSql, insertValue, function (error, results, next) {
            if(err){
              throw err;
            } else{
                res.status(201).send({success:true, message:'갤러리 등록 성공'});
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
