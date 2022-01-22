const User = require('./models/user');
  
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(User.authenticate()));