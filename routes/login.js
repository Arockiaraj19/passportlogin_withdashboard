var express = require('express');
var router = express.Router();
const passport = require('passport');
const {forwardAuthenticated}=require("../auth/auth.js");

//get login page
router.get('/login',forwardAuthenticated, function(req, res) {
  res.render('login');
});

//data sent to the passport maganisem
router.post('/login',passport.authenticate('local', 
{ failureRedirect: '/user/login', 
  failureFlash: 'Wrong username or password'}), (req, res, next) => {
res.redirect('/user/dashboard');
}
);
module.exports = router;
