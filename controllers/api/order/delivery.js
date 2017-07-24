var router = require('express').Router();


router.put('/:user_id', function(req, res, next){
try{

    req.getConnection(function(err, connection) {
      if(err)
      {
        console.error('SQL Connection error: ', err);
        return next(err);
      }
      else {

        var updateValue = req.body.deliData;
        console.log(req.body);
        // var updateSql = 'UPDATE category SET ? WHERE category_id = ?';
        // var category_id = req.body.category_id;
  //
  //       connection.query(updateSql, [updateValue, category_id], function (err, result, next) {
  //         if(err){
  //           res.json({success:false, message:err});
  //         }
  //         else {
  //           if(result === undefined){
  //             res.json({success:false, message:'카테고리 변경 실패!'});
  //           } else {
  //             res.json({success:true, message:'카테고리 변경 성공!'});
  //           }
  //
  //       }
  // });
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

        var insertSql = "INSERT INTO delivery set  ?";

        var insertValue = {
          user_id: req.decoded.user_id,
          sigungu_code: req.body.sigungu_code,
          jibun_address: req.body.jibun_address,
          road_address: req.body.road_address,
          detail_address: req.body.detail_address,
          name_buyer: req.body.name_buyer,
          email_buyer:req.body.email_buyer,
          cellphone_buyer:req.body.cellphone_buyer,
          homephone_buyer:req.body.homephone_buyer
        };

        connection.query(insertSql, insertValue, function (error, results, next) {
            if(err){
              throw err;
            } else{
              if(results === undefined){
                res.json({success:false, message: "주문 아이템 저장 실패!", err: error});
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



module.exports = router;
