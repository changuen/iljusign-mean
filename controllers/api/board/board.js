var router = require('express').Router();

router.post('/', function (req, res, next) {
    try {

        req.getConnection(function (err, connection) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            }
            else {
                console.log(req.params);
                if (req.body.title === '' || req.body.title === undefined || req.body.title === null) {
                    res.status(201).send({success: false, message: '제목을 입력해주세요.'});
                } else if (req.body.content === '' || req.body.content === undefined || req.body.type === null) {
                    res.status(201).send({success: false, message: '내용을 입력해주세요.'});
                } else {
                    var insertSql = 'INSERT INTO board set ?';
                    var insertValue = {
                        title: req.body.title,
                        content: req.body.content,
                        private: 0,
                        author: req.decoded.user_id
                    };
                    console.log(insertValue);
                    connection.query(insertSql, insertValue, function (error, results, next) {
                        if (err) {
                            throw err;
                        } else {
                            if (results) {
                                res.status(201).send({success: true, message: '등록 성공!'});
                            } else {
                                res.status(201).send({success: false, message: '등록 실패!'});
                            }
                        }
                    });

                }
            }
        });
    }
    catch (ex) {
        console.error("Internal error: " + ex);
        return next(ex);
    }
});

router.get('/', function (req, res, next) {
    try {

        req.getConnection(function (err, connection) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            }
            else {
                var selectSql = 'select board.*, users.username from board inner join users on board.author = users.user_id';
                connection.query(selectSql, function (error, results, next) {
                    if (err) {
                        throw err;
                    } else {
                        if (results) {
                            res.status(201).send({success: true, message: '읽기 성공!', boardData: results});
                        } else {
                            res.status(201).send({success: false, message: '읽기 실패!'});
                        }
                    }
                });

            }
        });
    }
    catch (ex) {
        console.error("Internal error: " + ex);
        return next(ex);
    }
});

router.get('/:article_id', function (req, res, next) {
    try {

        req.getConnection(function (err, connection) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            }
            else {
                var article_id = req.params.article_id;
                var selectSql = 'select * from board where id = ?';
                connection.query(selectSql, article_id, function (err, result, next) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        if (!result) {
                            res.json({success: false, message: '정보를 불러오지 못 하였습니다.'});
                        } else {
                            res.json({success: true, message: '정보를 불러왔습니다.', articleData: result[0]});
                        }
                    }
                });
            }
        });
    }
    catch (ex) {
        console.error("Internal error: " + ex);
        return next(ex);
    }
});

module.exports = router;
