var router = require('express').Router();

router.delete('/:item_id', function(req, res, next){
try{

    req.getConnection(function(err, connection) {
      if(err)
      {
        console.error('SQL Connection error: ', err);
        return next(err);
      }
      else {
          var deleteSql = 'delete from order_item where order_item_id = ?';
          var item_id = req.params.item_id;
          connection.query(deleteSql, item_id, function (err, result, next) {
          if(err){
            res.json({success:false, message: err});
          }
					else {
            if(!result){
              res.json({success:false, message:'주문정보 삭제 실패!'});
            } else {
              res.json({success:true, message:'주문정보 삭제 성공!'});
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

        var insertSql = "INSERT INTO order_item set  ?";

        var insertValue = {
          user_id: req.decoded.user_id,
          item_id: req.body.item_id,
          amount: req.body.amount,
          kind_of: req.body.kind_of,
          price: req.body.price
        };
        console.log(insertValue);
        connection.query(insertSql, insertValue, function (error, results, next) {
            if(err){
              throw err;
            } else{
              console.log(results);
              if(results === undefined){
                res.json({success:false, message: "주문 아이템 저장 실패!"});
              } else {
                res.json({success:true, message: "주문 아이템 저장 성공!"});
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

router.get('/:user_id', function(req, res, next){
try{

    req.getConnection(function(err, connection) {
      if(err)
      {
        console.error('SQL Connection error: ', err);
        return next(err);
      }
      else {

        var selectSql = 'select item.*, order_item.* from order_item inner join item on item.item_id = order_item.item_id where user_id = ?;';
        var user_id = req.params.user_id;

        connection.query(selectSql, user_id, function (error, results, next) {
            if(err){
              throw err;
            } else{
              if(results === undefined){
                res.json({success:false, message: "주문 아이템 불러오기 실패!"});
              } else {
                res.json({success:true, message: "주문 아이템 불러오기 성공!", result: results});
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

        var selectSql = 'select item.*, order_item.*, delivery.* from ((order_item inner join item on item.item_id = order_item.item_id) inner join delivery on order_item.user_id = delivery.user_id) where delivery.user_id = ?;';
        var user_id = req.decoded.user_id;

        connection.query(selectSql, user_id, function (error, results, next) {
            if(err){
              throw err;
            } else{
              if(results === undefined){
                res.json({success:false, message: "주문 아이템 불러오기 실패!"});
              } else {
                res.json({success:true, message: "주문 아이템 불러오기 성공!", result: results});
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
