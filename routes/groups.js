var express = require('express');
var router = express.Router();

/*
 * GET grouplist.
 */
router.get('/grouplist', function(req, res) {
    var db = req.db;
    db.collection('grouplist').find().toArray(function (err, items) {
        res.json(items);
    });
});

/*
 * GET groupStudentlist
 */
router.get('/groupStudentlist', function(req, res) {
    var db = req.db;
    db.collection('groupStudentlist').find().toArray(function (err, items) {
        res.json(items);
    });
});

/*
 * POST to creategroup.
 */
router.post('/creategroup', function(req, res) {
    var db = req.db;
 	db.collection('grouplist').insert(req.body, function(err, result) {
 		res.send(
 			(err === null) ? { msg: ''} : {msg: err}
 		);
 	});
 });

 /*
 * DELETE to deletegroup.
 */
router.delete('/deleteGroup/:id', function(req, res) {
    var db = req.db;
    var groupToDelete = req.params.id;
    db.collection('grouplist').removeById(groupToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

/*
 * POST to addStudent.
 */
router.post('/addStudent/', function(req, res) {
    var db = req.db;
    db.collection('groupStudentlist').insert(req.body, function(err, result) {
        res.send(
            (err === null) ? { msg: ''} : {msg: err}
        );
    });
 });

/*
 * DELETE to deletegroup.
 */
router.delete('/removeGroupStudent/:id', function(req, res) {
    var db = req.db;
    var groupStudentToDelete = req.params.id;
    db.collection('groupStudentlist').removeById(groupStudentToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
