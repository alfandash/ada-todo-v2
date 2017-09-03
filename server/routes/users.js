var express = require('express');
var router = express.Router();

// require contoller
const usersController = require('../controllers/users');

// require fb access token
var FB = require('fb');
var  fb = new FB.Facebook('v2.8');

const setAccessToken = (req,res,next) => {
  FB.setAccessToken(req.headers.fbaccesstoken);
  next()
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', usersController.signup)
router.post('/signin', usersController.signin)
router.get('/signin/facebook', setAccessToken, usersController.signinFacebook)

module.exports = router;
