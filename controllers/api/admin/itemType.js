var router = require('express').Router();

router.get('/', function(req, res, next){
try{

    req.getConnection(function(err, connection) {
      if(err)
      {
        console.error('SQL Connection error: ', err);
        return next(err);
      }
      else {
        var selectSql = 'select item_type.*, category.name, item.item_name, item.kind, item.price, item_id from ((item_type inner join category on item_type.category_id = category.category_id) inner join item on item_type.item_type_id = item.type);';
          connection.query(selectSql, function (err, result, next) {
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


router.post('/', function(req, res, next){
try{

    req.getConnection(function(err, connection) {
      if(err)
      {
        console.error('SQL Connection error: ', err);
        return next(err);
      }
      else {

            var insertSql = 'INSERT INTO item set ?';
            var insertValue = {
              type: req.body.type,
              item_name: req.body.title,
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
                  console.log(results);
                    res.status(201).send({success:true, message:'상품 등록 성공!'});
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


router.delete('/:item_type_id', function(req, res, next){
try{

    req.getConnection(function(err, connection) {
      if(err)
      {
        console.error('SQL Connection error: ', err);
        return next(err);
      }
      else {
        var deleteSql = 'delete from item_type where item_type_id = ?';
        var item_type_id = req.params.item_type_id;
          connection.query(deleteSql,  item_type_id, function (err, result, next) {
          if(err){
            res.json({success:false, message: err});
          }
          else {
            if(!result){
              res.json({success:false, message:'상품 타입 삭제 실패!'});
            } else {
              res.json({success:true, message:'상품 타입 삭제 성공!'});
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
        var selectSql = 'select item_type.*, category.name, item.item_name, item.kind, item.price, item_id from ((item_type inner join category on item_type.category_id = category.category_id) inner join item on item_type.item_type_id = item.type) where item_id = ?;';
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

router.put('/', function(req, res, next){
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
        var item_id = req.body.item_id;
        connection.query(updateSql, [updateValue, item_id], function (err, result, next) {
          if(err){
            res.json({success:false, message: err});
          }
          else {
            if(!result){
              res.json({success:false, message:'상품옵션 변경 실패!'});
            } else {
              res.json({success:true, message:'상품옵션 변경 성공!'});
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
