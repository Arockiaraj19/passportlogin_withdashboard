const express = require('express');
const router = express.Router();
//const ObjectID = require('mongodb').ObjectID;
const {isuserauthendicated}=require("../auth/auth")

//get add user page
router.get('/adduser',isuserauthendicated,(req,res)=>{
res.render('adduser')
}
);

/*
router.post('/adduser',async(res,req)=>{
  //console.log(req.session.passport.user);
  try{const users=req.app.locals.users;
    const _id=ObjectID(req.session.passposrt.user);
    const { email,fullname,password,userrole}=req.body;
    
     if( !email || !fullname || !password || !userrole ){
     cosole.log("please enter the input field")
     }else{
      await users.insertOne({
        email:email,
        name:fullname,
        password:password,
        userrole:userrole,
        date:new Date.now(),
        id:_id,
    }, (err,result) => {
      if (err) {
        throw err;
      }
    if(result){
       res.redirect('/dashboard/showuser');
    }
    });
    
     }}catch(err){
       if(err)throw err;
     }

      
}

);*/



module.exports = router;