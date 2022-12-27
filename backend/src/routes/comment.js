const express = require('express');
const routes = express.Router();
const CommentController = require('../app/controllers/CommentController');
const checkAuth = require('../app/middlewares/auth');

routes.get('/:idSong',CommentController.selectComment);
routes.post('/create',CommentController.createComment);
routes.post('/edit',CommentController.editComment);
routes.post('/delete/:commentId',CommentController.deleteComment);
routes.post('/like/:commentId',checkAuth.checkSignIn,CommentController.likeComment);

module.exports = routes;