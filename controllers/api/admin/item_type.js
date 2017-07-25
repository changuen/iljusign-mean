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

module.exports = router;
