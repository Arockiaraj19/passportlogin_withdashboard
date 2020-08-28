const express = require('express');
const router = express.Router();
const {isuserauthendicated}=require("../auth/auth")

router.get('/showuser',isuserauthendicated,(req,res)=>{
res.render('showuser')}
);



module.exports = router;