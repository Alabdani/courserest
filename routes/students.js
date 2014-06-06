var express = require('express');
var router = express.Router();

/*
 * GET studentlist.
 */
router.get('/studentlist', function(req, res) {
    var db = req.db;
    db.collection('studentlist').find().toArray(function (err, items) {
        res.json(items);
    });
});

/*
 * POST to addstudent.
 */
router.post('/addstudent', function(req, res) {
    var db = req.db;
 	db.collection('studentlist').insert(req.body, function(err, result) {
 		res.send(
 			(err === null) ? { msg: ''} : {msg: err}
 		);
 	});
 });

 /*
 * DELETE to removestudent.
 */
router.delete('/removeStudent/:id', function(req, res) {
    var db = req.db;
    var studentToRemove = req.params.id;
    db.collection('studentlist').removeById(studentToRemove, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
