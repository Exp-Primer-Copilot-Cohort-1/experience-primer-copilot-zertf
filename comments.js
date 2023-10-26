//Create web server
const express = require('express');
const app = express();
const port = 8080;
//Create router
const router = express.Router();
//Create body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Create mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/firstdb', { useNewUrlParser: true });
//Create Schema
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const CommentSchema = new Schema({
    id: ObjectId,
    name: String,
    comment: String
});
//Create model
const Comment = mongoose.model('Comment', CommentSchema);
//Create static file
app.use(express.static('public'));
//Create router
router.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
//Create api
router.route('/api/comments')
    .get(function (req, res) {
        Comment.find(function (err, comments) {
            if (err)
                res.send(err);
            res.json(comments);
        });
    })
    .post(function (req, res) {
        const comment = new Comment();
        comment.name = req.body.name;
        comment.comment = req.body.comment;
        comment.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'Comment successfully added!' });
        });
    });
//Create router
router.route('/api/comments/:comment_id')
    .put(function (req, res) {
        Comment.findById(req.params.comment_id, function (err, comment) {
            if (err)
                res.send(err);
            (req.body.name) ? comment.name = req.body.name : null;
            (req.body.comment) ? comment.comment = req.body.comment : null;
            comment.save(function (err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Comment has been updated' });
            });
        });
    })
    .delete(function (req, res) {
        Comment.remove({ _id: req.params.comment_id }, function (err, comment) {
            if (err)
                res.send(err);
            res.json({ message: 'Comment has been deleted' });
        });
    });
//Register router
app.use('/', router);
//Start server
app.listen(port, function () {
    console.log('Server running on port ' + port);
});
//# sourceMappingURL=comments.js.map