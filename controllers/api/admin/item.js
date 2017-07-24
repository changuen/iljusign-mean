var router = require('express').Router();


router.put('/:item_id', function(req, res, next){
try{

    req.getConnection(function(err, connection) {
      if(err)
      {
        console.error('SQL Connection error: ', err);
        return next(err);
      }
      else {

        var updateSql = 'UPDATE item SET ? WHERE item_id = ?';

        var updateValue = req.body;
        var item_id = req.params.item_id;

        connection.query(updateSql, [updateValue, item_id], function (err, result, next) {
          if(err){
                res.send(err);
          }
          else {
            if(result === undefined){
              res.json({success:false, message:'상품 변경 실패!'});
            } else {
              res.json({success:true, message:'상품 변경 성공!'});
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



router.delete('/:item_id', function(req, res, next){
try{

    req.getConnection(function(err, connection) {
      if(err)
      {
        console.error('SQL Connection error: ', err);
        return next(err);
      }
      else {
        var deleteSql = 'delete from item where item_id = ?';
        var item_id = req.params.item_id;
          connection.query(deleteSql,  item_id, function (err, result, next) {
          if(err){
            res.json({success:false, message: err});
          }
          else {
            if(!result){
              res.json({success:false, message:'상품 삭제 실패!'});
            } else {
              res.json({success:true, message:'상품 삭제 성공!'});
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
          if(req.body.title === '' || req.body.title === undefined || req.body.title === null){
              res.status(201).send({success:false, message:'올바른 상품 제목을 입력해주세요.'});
          } else if(req.body.type === '' || req.body.type === undefined || req.body.type === null) {
              res.status(201).send({success:false, message:'올바른 상품 타입1을 선택해주세요.'});
          } else {

            var insertSql = 'INSERT INTO item set ?';
            var insertValue = {
              type: req.body.type,
              name: req.body.title,
              // thumbnail: req.body.thumbnail,
              // explain: req.body.explain,
              // image: req.body.image,
              kind: req.body.kind,
              price: req.body.price
            };
            connection.query(insertSql, insertValue, function (error, results, next) {
                if(err){
                  throw err;
                } else{
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
        var selectSql = 'select item.*, item_type.type_description from item inner join item_type on item.type = item_type.item_type_id';
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
