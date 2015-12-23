var express = require('express');
var router = express.Router();

var postController = require('../controllers/post_controller');
var userController = require('../controllers/user_controller');
var sessionController = require('../controllers/session_controller');
var commentController = require('../controllers/comment_controller');
var attachmentController = require('../controllers/attachment_controller');
var favouriteController = require('../controllers/favourites_controller');

/* GET home page. */
router.get('/', sessionController.autologout, function(req, res) {
  res.render('index');
});

/* GET creditos */
router.get('/creditos', sessionController.autologout, function(req,res,next) {
    res.render('creditos');
});

/* Rutas de sesiones */

router.get('/login',  sessionController.new); 
                     // obtener el formulario a rellenar para hacer login. 
router.post('/login', sessionController.create); 
                     // enviar formulario para crear la sesión.
router.get('/logout', sessionController.destroy); 
                     // destruir la sesión actual.

/* Autoloading */

router.param('postid',postController.load);  // autoload :postid
router.param('userid', userController.load); // autoload :userid
router.param('commentid', commentController.load); // autoload :commentid
router.param('attachmentid', attachmentController.load); // autoload :attachmentid

/* Rutas de las imagenes adjuntas */

router.get('/posts/:postid([0-9]+)/attachments', 
  attachmentController.index);

router.get('/posts/:postid([0-9]+)/attachments/new', 
  sessionController.loginRequired,
  postController.loggedUserIsAuthor,
  attachmentController.new);

router.post('/posts/:postid([0-9]+)/attachments', 
   sessionController.loginRequired,
   postController.loggedUserIsAuthor,
   attachmentController.create);

router.delete('/posts/:postid([0-9]+)/attachments/:attachmentid([0-9]+)', 
     sessionController.loginRequired,
     postController.loggedUserIsAuthor,
     attachmentController.destroy);

/* Rutas de Comentarios */

router.get('/posts/:postid([0-9]+)/comments', 
  commentController.index);

router.get('/posts/:postid([0-9]+)/comments/new', 
  sessionController.loginRequired,
  commentController.new);

router.get('/posts/:postid([0-9]+)/comments/:commentid([0-9]+)',
  commentController.show);

router.post('/posts/:postid([0-9]+)/comments', 
   sessionController.loginRequired,
   commentController.create);

router.get('/posts/:postid([0-9]+)/comments/:commentid([0-9]+)/edit', 
  sessionController.loginRequired,
  commentController.loggedUserIsAuthor,
  commentController.edit);

router.put('/posts/:postid([0-9]+)/comments/:commentid([0-9]+)', 
  sessionController.loginRequired,
  commentController.loggedUserIsAuthor,
  commentController.update);

router.delete('/posts/:postid([0-9]+)/comments/:commentid([0-9]+)', 
     sessionController.loginRequired,
     commentController.loggedUserIsAuthor,
     commentController.destroy);

/* Rutas de Posts */

router.get('/posts', sessionController.autologout, 
                     postController.index);

router.get('/posts/new', sessionController.autologout,
  sessionController.loginRequired,
  postController.new);

router.get('/posts/:postid([0-9]+)', sessionController.autologout,
  postController.show);

router.post('/posts', sessionController.autologout,
  sessionController.loginRequired,
  postController.create);

router.get('/posts/:postid([0-9]+)/edit', sessionController.autologout,
  sessionController.loginRequired,
  postController.loggedUserIsAuthor,
  postController.edit);

router.put('/posts/:postid([0-9]+)', sessionController.autologout, 
  sessionController.loginRequired,
  postController.loggedUserIsAuthor,
  postController.update);

router.delete('/posts/:postid([0-9]+)', sessionController.autologout,
  sessionController.loginRequired,
  postController.loggedUserIsAuthor,
  postController.destroy);

router.get('/posts/search', sessionController.autologout,
  postController.search);

/* Rutas de Users */

router.get('/users', sessionController.autologout,
  userController.index);

router.get('/users/new', sessionController.autologout,
  userController.new);

router.get('/users/:userid([0-9]+)', sessionController.autologout,
  userController.show);

router.post('/users', sessionController.autologout,
  userController.create);

router.get('/users/:userid([0-9]+)/edit', sessionController.autologout,
  sessionController.loginRequired,
  userController.loggedUserIsUser,
  userController.edit);

router.put('/users/:userid([0-9]+)', sessionController.autologout,
  sessionController.loginRequired,
  userController.loggedUserIsUser,
  userController.update);

router.delete('/users/:userid([0-9]+)', sessionController.autologout,
  sessionController.loginRequired,
  userController.destroy);

/* Rutas de favoritos */

router.get('/users/:userid([0-9]+)/favourites', favouriteController.index);

router.put('/users/:userid([0-9]+)/favourites/:postid([0-9]+)', 
  sessionController.autologout,
  sessionController.loginRequired,
  userController.loggedUserIsUser,
  favouriteController.add);

router.delete('/users/:userid([0-9]+)/favourites/:postid([0-9]+)', 
  sessionController.autologout,
  sessionController.loginRequired,
  userController.loggedUserIsUser,
  favouriteController.destroy);


module.exports = router;
