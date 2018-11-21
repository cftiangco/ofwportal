const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

//require('../models/user.model');

//Load users model
const User = mongoose.model('User');

module.exports = function(passport) {
  let tries = 0;
  passport.use(new LocalStrategy({usernameField: 'username'},(username, password, done) => {
    //Match User
    User.findOne({username: username})
      .then((user) => {
        if(!user) {
          tries = 0;
          done(null,  false, {message: "<div class='alert alert-danger'>Incorrect username.</div>"});
        }else {
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if(err){throw err};

            if(isMatch) {
              if(user.status === 'inactive') {
                return done(null,  false, {message: "<div class='alert alert-danger'>Your account is deactivated, Please contact the System Administrator.</div>"});
              } else {
                return done(null, user);
              }
            } else {
              User.findOne({username: username})
                .then(user => {
                  if(user.status === 'inactive') {
                    return done(null,  false, {message: "<div class='alert alert-danger'>This account is Deactivated, Please contact the Administrator.</div>"});
                  } else {
                    ++tries;
                    if(tries === 4) {
                      User.findOne({username:username})
                        .then(user => {
                          if(user) {
                            user.status = 'inactive';
                            user.save();
                            tries = 0;
                            return done(null,  false, {message: "<div class='alert alert-danger'>This account is now deactivated, Please contact the system administrator.</div>"});
                          } else {
                            tries--;
                          }
                        })
                    } else {
                    console.log(tries);
                    return done(null,  false, {message: "<div class='alert alert-danger'>Incorrect password.</div>"});
                    }
                  }
                });
            }
          })
        }
      }).catch((err) => {
        console.log(err);
      });
  }));

  passport.serializeUser(function(user, done) {
    tries = 0
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    tries = 0;
    User.findById(id, function(err, user){
      done(err, user);
    });
  });
}