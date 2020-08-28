var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();
const {forwardAuthenticated}=require("../auth/auth.js");

//get an account
router.get('/register',forwardAuthenticated, function(req, res) {
  res.render('register');
});



//register a account
router.post('/register', async(req, res)=> {
 const{username,email,password}=req.body;
 
 if (!username || !email || !password ) {
 req.flash("error_msg","please enter the details")
}else{
  const users = req.app.locals.users;
  try{
   const hashpassword= await bcrypt.hash(password, 12);
   
   await users.insertOne({username,email,password:hashpassword},(err,result)=>{
    if(err){
      req.flash("error_msg","User had some error")
    }else(
      req.flash("success_msg","user register successfully")
    )
 
    })}catch(err){
    console.log(err);
  }
  res.redirect('/user/login');
 }
 
});
 




module.exports = router;
