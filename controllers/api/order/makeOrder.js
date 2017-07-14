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

        var insertSql = "INSERT INTO order_item set  ?";
        var insertValue = {
          user_id: req.decoded.user_id,
          item_id: req.body.item_id,
          item_type: req.body.item_type_id,
          amount: req.body.amount,
          kind_of: req.body.kindOf
        };
        connection.query(insertSql, insertValue, function (error, results, next) {
            if(err){
              throw err;
            } else{
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


router.get('/', function(req, res, next){
try{

    req.getConnection(function(err, connection) {
      if(err)
      {
        console.error('SQL Connection error: ', err);
        return next(err);
      }
      else {

        var selectSql = 'select item.*, order_item.* from order_item inner join item on item.item_id = order_item.item_id where user_id = ?;';
        var user_id = req.decoded.user_id;

        connection.query(selectSql, user_id, function (error, results, next) {
            if(err){
              throw err;
            } else{
              if(results === undefined){
                res.json({success:false, message: "주문 아이템 불러오기 실패!"});
              } else {
                console.log(results[0]);
                res.json({success:true, message: "주문 아이템 불러오기 성공!", result: results[0]});
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
