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
        var selectSql = 'select * from item_type';
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
          type1: req.body.type1,
          type1_description: req.body.type1_description,
          type2: req.body.type2,
          type2_description: req.body.type2_description,
          kind: req.body.kind
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





module.exports = router;
