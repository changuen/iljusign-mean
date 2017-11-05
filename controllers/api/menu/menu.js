var router = require('express').Router();

router.put('/', function(req, res, next){
try{

    req.getConnection(function(err, connection) {
      if(err)
      {
        console.error('SQL Connection error: ', err);
        return next(err);
      }
      else {

        var updateSql = 'UPDATE category SET ? WHERE category_id = ?';
        console.log(req.body);
        // var updateValue = {req.body;
        var updateValue = {
          name: req.body.name
        };

        var category_id = req.body.category_id;

        connection.query(updateSql, [updateValue, category_id], function (err, result, next) {
          if(err){
            res.json({success:false, message:err});
          }
          else {
            if(result === undefined){
              res.json({success:false, message:'카테고리 변경 실패!'});
            } else {
              res.json({success:true, message:'카테고리 변경 성공!'});
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




router.delete('/:category_id', function(req, res, next){
try{

    req.getConnection(function(err, connection) {
      if(err)
      {
        console.error('SQL Connection error: ', err);
        return next(err);
      }
      else {
          var deleteSql = 'delete from  category where category_id = ?';
          var category_id = req.params.category_id;
          connection.query(deleteSql, category_id, function (err, result, next) {
          if(err){
            res.json({success:false, message: err});
          }
					else {
            if(!result){
              res.json({success:false, message:'카테고리 삭제 실패!'});
            } else {
              res.json({success:true, message:'카테고리 삭제 성공!'});
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

        var insertSql = 'insert into category set ?;';
        var insertValue = {
          name: req.body.name
        };
          connection.query(insertSql, insertValue, function (err, result, next) {
          if(err){
            res.json({success:false, message: err});
          }
					else {
            if(!result){
              res.json({success:false, message:'카테고리 추가 실패!'});
            } else {
              res.json({success:true, message:'카테고리 추가 성공!', result: result});
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
        var selectSql = 'select * from item_type where category_id = ?';
				//Select a record.
          connection.query(selectSql, category_id, function (err, result, next) {
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
