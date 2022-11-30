const express = require('express');
const routes = express.Router();
const CommentController = require('../app/controllers/CommentController');

routes.get('/:idSong',CommentController.selectComment);
routes.post('/create',CommentController.createComment);
routes.post('/edit',CommentController.editComment);
routes.post('/delete',CommentController.deleteComment);

module.exports = routes;