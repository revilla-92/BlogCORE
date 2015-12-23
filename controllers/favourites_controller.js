
var models = require('../models');

exports.index = function(req, res, next){
	models.Favourite
		.findAll({where: {UserId: req.user.id,
						  best: [4, 5]},
				  order: [['best', 'DESC'],
				  		  [models.Post, 'updatedAt', 'DESC']],
				  include: [{model:models.Post,
				  			include: [ {model: models.User, as: 'Author'}
				  			]
				  		}
				  	]		  	  
	})
	.success(function(favourites){

		var posts =  favourites.map(function(favourite){
			favourite.post.best = favourite.best;
			return favourite.post;
		});

		res.render('favourites/index', {
			posts:posts
		});
	})
	.error(function(error){
		next(error);
	});
};


exports.add = function(req, res, next){

	var newbest = req.body.best || 5;

	console.log(req.body);

	var redir = req.body.redir || '/users/' + req.user.id + '/favourites';

	models.Favourite.
		findOrCreate({
			UserId: req.user.id,
			PostId: req.post.id
		},{ best: 5})
	.success(function(favourite){

		favourite.best = newbest;

		favourite.save()
			.success(function() {
				req.flash('success', 'Favorito marcado con exito');
				res.redirect(redir);
			})
			.error(function(error){
				next(error);
			});	
	})
	.error(function(error){
		next(error);
	});

};


exports.destroy = function(req, res, next){

	var redir = req.body.redir || '/users/' + req.user.id + '/favourites';

	models.Favourite.
		find({where: { UserId: req.user.id,
			  		   PostId: req.post.id
		}})
		.success(function(favourite){

			if(favourite){

				favourite.destroy()
					.success(function(){
						req.flash('success', 'Favorito eliminado con exito.');
						res.redirect(redir);
					})
					.error(function(error){
						next(error);
					});
			}
		})
		.error(function(error){
			next(error);
		});
};


