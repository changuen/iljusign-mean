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

                var insertSql = 'insert into comment set ?;';

                var insertValue = {
                    board_id: req.body.boardId,
                    comment: req.body.comment
                    // author_id: req.decoded.user_id
                };

                connection.query(insertSql, insertValue, function (err, result, next) {
                    if(err){
                        res.json({success:false, message: err});
                    }
                    else {
                        var successStatus = false;
                        var messageStatus = "오류가 발생하였습니다.";

                        if(!result){

                        } else {
                           successStatus = true;
                           messageStatus = "답변이 입력되었습니다.";
                        }

                        res.json({success: successStatus, message: messageStatus});
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

router.get('/:board_id', function(req, res, next){
    try{

        req.getConnection(function(err, connection) {
            if(err)
            {
                console.error('SQL Connection error: ', err);
                return next(err);
            }
            else {

                var board_id = req.params.board_id;
                var selectSql = 'select * from comment where board_id = ?';
                //Select a record.
                connection.query(selectSql, board_id, function (err, result, next) {
                    if(err){
                        console.error('SQL error: ', err);
                        return next(err);
                    }
                    else {
                        var successStatus = false;
                        var messageStatus = "불러오기 실패!";

                        if(!result){
                            successStatus = false;
                        } else {
                            successStatus = true;
                            messageStatus = "불러오기 성공!";
                        }
                        res.json({success: successStatus, message: messageStatus, commentData: result})
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
