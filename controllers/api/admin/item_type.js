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

router.get('/:category_id', function(req, res, next){
try{

    req.getConnection(function(err, connection) {
      if(err)
      {
        console.error('SQL Connection error: ', err);
        return next(err);
      }
      else {
        var category_id = req.params.category_id;
        var selectSql = 'select * from item inner join item_type on item.type = item_type.item_type_id where category_id = ?;';
        if(!req.query.type_code){
          // var selectSql = 'select * from item inner join item_type on item.type = item_type.item_type_id where where(category_id =?) and (type_code=?)';
            connection.query(selectSql, category_id, function (err, result, next) {
            if(err){
              res.json({success:false, message: err});
            }
            else {
              if(!result){
                res.json({success:false, message:'정보를 불러오지 못 하였습니다.'});
              } else {
                res.json({success:true, message:'정보를 불러왔습니다.', result: result});
              }
            }
          });
        } else {
          selectSql = 'select * from item inner join item_type on item.type = item_type.item_type_id where(category_id=?) and (type_code=?);';
          var type_code = req.query.type_code;
          // var selectSql = 'select * from item inner join item_type on item.type = item_type.item_type_id where where(category_id =?) and (type_code=?)';

            connection.query(selectSql, [category_id, type_code], function (err, result, next) {
            if(err){
              res.json({success:false, message: err});
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
          type_code: req.body.type_code,
          kind: req.body.kind,
          price: req.body.price
        };
          connection.query(insertSql, insertValue, function (err, result, next) {
          if(err){
                res.send(err);
          }
          else {
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





module.exports = router;
