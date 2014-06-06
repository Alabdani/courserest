var express = require('express');
var router = express.Router();

/*
 * GET forumNotes.
 */
router.get('/forumNote', function(req, res) {
    var db = req.db;
    db.collection('forumNote').find().toArray(function (err, items) {
        res.json(items);
    });
});

/*
 * POST to addForumNote.
 */
 
router.post('/addForumNote', function(req, res) {
    var db = req.db;
 	db.collection('forumNote').insert(req.body, function(err, result) {
 		res.send(
 			(err === null) ? { msg: ''} : {msg: err}
 		);
 	});
 });


module.exports = router;
