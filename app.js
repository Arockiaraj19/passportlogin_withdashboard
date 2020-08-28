
const express = require('express');
const bodyParser = require('body-parser')
const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');
const path = require('path');
const cookieParser = require('cookie-parser');
//const flash = require('connect-flash');
const logger = require('morgan');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const session = require('express-session');
const login = require('./routes/login');
const register = require('./routes/register');
const dashboard = require('./routes/dashbord');
const adduser=require("./routes/add_user");
const showuser=require("./routes/show_user");


const app = express();
//middleware functions
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views'))); 



//connecting to the database
MongoClient.connect('mongodb://localhost:27017/' ,{ useUnifiedTopology: true },(err, result)=>{
  if(err) throw error;

  const db=result.db('admin');
   user=db.collection('user');
   app.locals.users=user;

});
 
//passport strategy
 passport.use(new Strategy({ usernameField: 'email' },
 (email, password, done) => {
   app.locals.users.findOne({ email:email}, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  }
));
 
//passport session details
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  done(null, { id });
});
// -------------

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




//session setup
app.use(session({
  secret: 'session secret',
  resave: false,
  saveUninitialized: false,
}));

//initializepassport
app.use(passport.initialize());
app.use(passport.session());



//get welcome page
app.get('/',(req,res)=>
res.render('welcome')
);

//logout
app.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

//router middleware
app.use('/user',login,register,dashboard,adduser,showuser);








//port setup
app.listen(4000,()=>console.log("server is connected in 4000"));

module.exports = app;
