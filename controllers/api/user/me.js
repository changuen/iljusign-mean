var router = require('express').Router();

// 생성된 사용자와 입력된 정보 비교
router.post('/', function(req, res, next){
try{
    req.getConnection(function(err, connection) {
      if(err){
        console.error('SQL connection error : ', err);
        return next(err);
      }
      else
      {
        res.send(req.decoded);
      }
    });
  }
    catch(ex){
    console.log("Internal error: " +ex);
    return next(ex);
    }
});

module.exports= router;
