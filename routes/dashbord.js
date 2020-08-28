const express = require('express');
const router = express.Router();

const {isuserauthendicated}=require("../auth/auth")



//get  Dashboard
router.get('/dashboard',isuserauthendicated ,(req, res) =>{
 res.render('dashboard')}
);


module.exports = router;