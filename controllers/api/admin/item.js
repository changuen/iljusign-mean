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
              res.status(201).send({success:false, message:'올바른 상품 타입1을 선택해주세요.'});
          } else {

            var insertSql = 'INSERT INTO item set ?';
            var insertValue = {
              type: req.body.type,
              name: req.body.title,
              price: req.body.price,
              thumbnail: req.body.thumbnail,
              explain: req.body.explain,
              image: req.body.image
            };
            console.log(insertValue);
            connection.query(insertSql, insertValue, function (error, results, next) {
                if(err){
                  throw err;
                } else{
                  console.log(results);
                    res.status(201).send({success:true, message:'상품 등록 성공!'});
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
        var selectSql = 'select * from item';
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
        var selectSql = 'select * from item inner join item_type on item.type = item_type.item_type_id where item_id = ?';
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
