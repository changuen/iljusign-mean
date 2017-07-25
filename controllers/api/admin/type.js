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
        var selectSql = 'select item_type.*, category.name from item_type inner join category on item_type.category_id = category.category_id;';
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
        var insertSql = 'insert into item_type set ?';
        var insertValue = {
          category_id: req.body.category,
          type_description: req.body.type_description,
          type_code: req.body.type_code
        };
        console.log(insertValue);
          connection.query(insertSql, insertValue, function (err, result, next) {
          if(err){
                res.send(err);
          }
          else {
            console.log(result);
            if(!result){
              res.json({success:false, message:'상품 분류표 등록 실패!'});
            } else {
              res.json({success:true, message:'상품 분류표 등록 성공!'});
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


router.get('/:item_type', function(req, res, next){
try{

    req.getConnection(function(err, connection) {
      if(err)
      {
        console.error('SQL Connection error: ', err);
        return next(err);
      }
      else {
        var item_type = req.params.item_type;
        var selectSql = 'select item_type.*, category.name from item_type inner join category on item_type.category_id = category.category_id where item_type_id = ?;';
          connection.query(selectSql,  item_type, function (err, result, next) {
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

        var updateSql = 'UPDATE item_type SET ? WHERE item_type_id = ?';
        var updateValue = {
          category_id: req.body.category_id,
          type_description: req.body.type_description,
          type_code: req.body.type_code,
        };

        var item_type_id = req.body.item_type_id;

        connection.query(updateSql, [updateValue, item_type_id], function (err, result, next) {
          if(err){
                res.send(err);
          }
          else {
            if(result === undefined){
              res.json({success:false, message:'상품코드 변경 실패!'});
            } else {
              res.json({success:true, message:'상품코드 변경 성공!'});
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
