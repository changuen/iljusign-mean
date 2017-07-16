var router = require('express').Router();

router.get('/:category_id', function(req, res, next){
try{

    req.getConnection(function(err, connection) {
      if(err)
      {
        console.error('SQL Connection error: ', err);
        return next(err);
      }
      else {
        var selectSql = 'select * from item_type where category_id = ?';
        var category_id = req.params.category_id;
          connection.query(selectSql,  category_id, function (err, result, next) {
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


module.exports = router;
