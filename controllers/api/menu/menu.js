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

        var selectSql = 'select * from category;';
				//Select a record.
          connection.query(selectSql, function (err, result, next) {
          if(err){
            res.json({success:false, message:'불러오기 실패!'});
          }
					else {
            if(!result){
              res.json({success:false, message:'불러오기 실패!'});
            } else {
              res.json({success:true, message:'불러오기 성공!', result: result});
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

router.get('/:subType', function(req, res, next){
try{

    req.getConnection(function(err, connection) {
      if(err)
      {
        console.error('SQL Connection error: ', err);
        return next(err);
      }
      else {

        var subType = req.params.subType;
        var selectSql = 'select * from item_type where category_id = ?';
				//Select a record.
          connection.query(selectSql, subType, function (err, result, next) {
          if(err){
            console.error('SQL error: ', err);
            return next(err);
          }
					else {
            if(!result){
              res.json({success:false, message:'불러오기 실패!'});
            } else {
              res.json({success:true, message:'불러오기 성공!', result: result});
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
