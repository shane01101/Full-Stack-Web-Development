var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Dishes = require('../models/dishes');
var Favorites = require('../models/favorites');
var Verify = require('./verify');
var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.all(Verify.verifyOrdinaryUser)

.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.find({})
        .populate('postedBy')
        .populate('dishes')
        .exec(function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
    });
})

.post(function (req, res, next) {
    Favorites.create(req.body, function (err, favorite) {
        if (err) throw err;
        favorite.postedBy = req.decoded._doc._id;
        favorite.dishes.push(req.body);
        favorite.save(function (err, favorite) {
            if (err) throw err;
            console.log('Favroites Create');
            res.json(favorite);
        });
    });
})

.delete(function (req, res, next) {
    Favorites.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

favoriteRouter.route('/:dishId')
.all(Verify.verifyOrdinaryUser)

.delete(function (req, res, next) {
    var userId = req.decoded._doc._id;

    Favorites.findOneAndUpdate({
      postedBy: userId
    }, {
      $pull: {
        dishes: req.params.dishId
      }
    }, {
      new: true
    }, function (err, favorite) {
      if (err) throw err;

      res.json(favorite);
    });
  });
//TODO
//.post(function (req, res, next) {
//	Favorites.findOne({}, function (err, favorite) {
//		if (err) throw err;
//		for(var key in req.body) {
//			var index = favorite.dishes.indexOf(req.body[key])
//			console.log(index);
//			if (index == -1){
//				favorite.dishes.push(req.body)
//				console.log('Favorite added!');
//            };
//         };	
//        favorite.save(function (err, favorite) {
//            if (err) throw err;
//            console.log('Updated Favorites!');
//            res.json(favorite);
//        });
//    });
// });

//favoriteRouter.route('/dishes/:dishObjectId')
//.all(Verify.verifyOrdinaryUser)



module.exports = favoriteRouter;