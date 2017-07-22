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
          var deleteSql = 'delete from basket where basket_id = ?';
          var basket_id = req.params.item_id;
          connection.query(deleteSql, basket_id, function (err, result, next) {
          if(err){
            res.json({success:false, message: err});
          }
					else {
            if(!result){
              res.json({success:false, message:'장바구니 삭제 실패!'});
            } else {
              res.json({success:true, message:'장바구니 삭제 성공!'});
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

        var insertSql = "INSERT INTO basket set ?;";
        var insertValue = {
          user_id: req.decoded.user_id,
          item_id: req.body.item_id
        };
        connection.query(insertSql, insertValue, function (error, results, next) {
            if(err){
              throw err;
            } else{
              if(results === undefined){
                res.json({success:false, message: "장바구니 저장 실패!"});
              } else {
                res.json({success:true, message: "장바구니 저장 성공!"});
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

        var selectSql = "select basket.*, item_type.*,  item.name, item.type from ((basket inner join item on basket.item_id = item.item_id) inner join item_type on item.type = item_type.item_type_id) where user_id = ?";
        var user_id = req.decoded.user_id;
        connection.query(selectSql, user_id, function (error, results, next) {
            if(err){
              throw err;
            } else{
              if(results === undefined){
                res.json({success:false, message: "장바구니 불러오기 실패!"});
              } else {
                res.json({success:true, message: "장바구니 불러오기 성공!", result: results});
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
