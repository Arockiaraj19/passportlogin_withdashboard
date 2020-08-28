
    //checking for the authendicate user
    const isuserauthendicated=(req, res, next)=> {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect('/user/login');
    }
    //user not authendicated
     const forwardAuthenticated=(req, res, next)=> {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/user/register');      
    }
    module.exports = {isuserauthendicated,forwardAuthenticated};
  