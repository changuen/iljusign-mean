var router = require('express').Router();

router.post('/', function(req, res, next){
try{

    req.getConnection(function(err, connection) {
      if(err)
      {
        console.error('SQL Connection error: ', err);
        return next(err);
      }
      else {
          if(req.body.title === '' || req.body.title === undefined || req.body.title === null){
              res.status(201).send({success:false, message:'올바른 상품 제목을 입력해주세요.'});
          } else if(req.body.price === '' || req.body.price === undefined || req.body.price === null){
              res.status(201).send({success:false, message:'올바른 상품 가격 입력해주세요.'});
          } else if(req.body.type === '' || req.body.type === undefined || req.body.type === null) {
              res.status(201).send({success:false, message:'올바른 상품 타입을 선택해주세요.'});
          } else if(req.body.image === '' || req.body.image === undefined || req.body.image === null) {
              res.status(201).send({success:false, message:'올바른 상품 이미지를 선택해주세요.'});
          } else if(req.body.explain === '' || req.body.explain === undefined || req.body.explain === null) {
              res.status(201).send({success:false, message:'올바른 상품 설명을 입력해주세요.'});
          } else if(req.body.thumbnail === '' || req.body.thumbnail === undefined || req.body.thumbnail === null) {
              res.status(201).send({success:false, message:'올바른 썸네일을 입력해주세요.'});
          } else {

            var insertSql = 'INSERT INTO items set ?';
            var insertValue = {
              type: req.body.type,
              title: req.body.title,
              price: req.body.price,
              image: req.body.image,
              thumbnail: req.body.thumbnail,
              explain: req.body.explain
            };

            connection.query(insertSql, insertValue, function (error, results, next) {
            // databases에서  select 문으로 중복된 사용자 찾아야함.
                if(err){
                  res.status(201).send({success:false, message: err});
                } else{
                  if(!results){
                    res.status(201).send({success:false, message:'상품이 등록 실패!'});
                  } else {
                    res.status(201).send({success:true, message:'상품이 등록 성공!'});
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


router.get('/', function(req, res, next){
try{

    req.getConnection(function(err, connection) {
      if(err)
      {
        console.error('SQL Connection error: ', err);
        return next(err);
      }
      else {
        var selectSql = 'select * from items';
          connection.query(selectSql,  function (err, result, next) {
          if(err){
                res.send(err);
          }
          else {
            if(!result){
              res.json({success:false, message:'정보를 불러오지 못 하였습니다.'});
            } else {
              res.json({success:true, message:'정보를 불러왔습니다.', result: result});
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

router.get('/:item_id', function(req, res, next){
try{

    req.getConnection(function(err, connection) {
      if(err)
      {
        console.error('SQL Connection error: ', err);
        return next(err);
      }
      else {
        var item_id = req.params.item_id;
        var selectSql = 'select * from items where item_id = ?';
          connection.query(selectSql,  item_id, function (err, result, next) {
          if(err){
                res.send(err);
          }
          else {
            if(!result){
              res.json({success:false, message:'정보를 불러오지 못 하였습니다.'});
            } else {
              res.json({success:true, message:'정보를 불러왔습니다.', result: result[0]});
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
