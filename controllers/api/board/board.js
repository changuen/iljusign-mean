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
                if(req.body.title === '' || req.body.title === undefined || req.body.title === null){
                    res.status(201).send({success:false, message:'제목을 입력해주세요.'});
                } else if(req.body.content === '' || req.body.content === undefined || req.body.type === null) {
                    res.status(201).send({success:false, message:'내용을 입력해주세요.'});
                } else {
                    var insertSql = 'INSERT INTO board set ?';
                    var insertValue = {
                        title: req.body.title,
                        content: req.body.content,
                    };
                    connection.query(insertSql, insertValue, function (error, results, next) {
                        if(err){
                            throw err;
                        } else{
                            console.log(results);
                            if(results){
                                res.status(201).send({success:true, message:'상품 등록 성공!'});
                            } else {
                                res.status(201).send({success:false, message:'상품 등록 실패!'});
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
