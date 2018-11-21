const User = require('../models/user.model');
const Agency = require('../models/agency.model');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {check} = require('express-validator/check');


module.exports.index = (req, res) => {
    res.send("Test");
};

module.exports.add = (req, res) => {
    Agency.find({})
        .then((agencies) => {
            res.render('users/add', {
                agencies:agencies,
                errors:false
            });
        }).catch((err) => {
            console.log(err);
        });
};

module.exports.create = (req, res) => {

    let UserID = 'superuser';    
    if(req.body.agency_name === undefined) {
            newUser = new User({
            lastname : req.body.last_name,
            firstname : req.body.first_name,
            middlename : req.body.middle_name,
            username : req.body.username,
            password : req.body.password,
            status : req.body.status,
            userType : req.body.user_type,
            user:UserID
        });
    } else {
            newUser = new User({
            lastname : req.body.last_name,
            firstname : req.body.first_name,
            middlename : req.body.middle_name,
            username : req.body.username,
            password : req.body.password,
            status : req.body.status,
            userType : req.body.user_type,
            agency : req.body.agency_name,
            user:UserID
        });
    }

    req.checkBody('last_name','Last Name is required.').notEmpty();
    if(req.body.last_name) {
        req.checkBody('last_name', 'Last Name must be 2 characters long ').isLength({ min: 2, max:20 });
        req.checkBody('last_name','Last Name cannot contain any numbers or special character').matches(/^[a-zA-Z\s]*$/);
    }

    req.checkBody('first_name','First Name is required.').notEmpty();
    if(req.body.first_name) {
    req.checkBody('first_name', 'First Name must be 2 characters long ').isLength({ min: 2, max:20 });
        req.checkBody('first_name','First Name cannot contain any numbers or special character').matches(/^[a-zA-Z\s]*$/);
    }

    req.checkBody('middle_name','Middle Name is required.').notEmpty();
    if(req.body.middle_name) {
        req.checkBody('middle_name', 'Middle Name must be 2 characters long ').isLength({ min: 2, max:20 });
        req.checkBody('middle_name','Middle Name cannot contain any numbers or special character').matches(/^[a-zA-Z\s]*$/);
    }
    req.check('username','Username is required').notEmpty();
    if(req.body.username.length > 0) {
        req.checkBody('username','Username must be 5 characters long').isLength({min: 5, max:20});
        req.checkBody('username','username cannot contain any special character').matches(/^[a-zA-Z0-9]*$/);
        req.checkBody('username');
    }
    req.checkBody('password','Password cannot empty').notEmpty();
    if(req.body.password) {
        req.checkBody('password','Password must be 8 characters long').isLength({min:8});
        req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
        req.checkBody('confirm_password','Confirm password cannot empty').notEmpty();
    }
    if(req.body.confirm_password.length > 0) {
       req.assert('password', 'Confirm passwords do not match').equals(req.body.confirm_password);
    }
    req.check('user_type','Please choose user type').notEmpty();
    let errors = req.validationErrors();

    if(errors) {
        Agency.find({})
            .then((agencies) => {
                res.render('users/add', {
                    errors:errors,
                    lastname : req.body.last_name,
                    firstname : req.body.first_name,
                    middlename : req.body.middle_name,
                    username : req.body.username,
                    password : req.body.password,
                    status : req.body.status,
                    userType : req.body.user_type,
                    agency : req.body.agency_name,
                    agencies:agencies
                })
            }).catch((err) => {
                res.send(error);
            })
    } else {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err,hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save().then((user) => {
                    req.flash('success_msg',"<div class='alert alert-success'>User has been successfully Registered</div>");
                    res.redirect('/users/manage');
                }).catch((err) => {
                    res.status(500).send(err);
                });  
                
            });
        });
    }

    
    
}

module.exports.login = (req, res) => {
    if(!req.user) {
        res.render('index');
    } else {
        res.redirect('/patients');
    }
}

//login form post
module.exports.log = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect:'/patients',
        failureRedirect:'/users/login',
        failureFlash:true
    }
    )(req, res, next)
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success_msg','You are Logged out');
    res.redirect('/users/login')
}

module.exports.manage = (req, res) => {
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        User.find({firstname:regex})
            .then((users) => {
                res.render('users/manage', {
                    users:users
                });
        });
    } else {
    User.find({})
        .then((users) => {
            res.render('users/manage', {
                users:users
            });
        }).catch((err) => {
            res.send(err);
        });
    }
}

module.exports.edit = (req, res) => {
    User.findById({_id:req.params.id})
        .then((user) => {
            Agency.find({})
                .then((agencies) => {
                    res.render('users/edit', {
                        user:user,
                        agencies:agencies,
                        errors:false
                    });
                });
        }).catch((err) => {
            res.send(err);
        });
}

module.exports.put = (req, res) => {
    User.findById({_id: req.params.id})
        .then((user) => {
                if(req.body.agency_name === undefined) {
                        user.lastname = req.body.last_name,
                        user.firstname = req.body.first_name,
                        user.middlename = req.body.middle_name,
                        user.username = req.body.username,
                        user.status = req.body.status,
                        user.userType = req.body.user_type;
                } else {
                        user.lastname = req.body.last_name,
                        user.firstname = req.body.first_name,
                        user.middlename = req.body.middle_name,
                        user.username = req.body.username,
                        user.status = req.body.status,
                        user.userType = req.body.user_type,
                        user.agency = req.body.agency_name
                }

    req.checkBody('last_name','Last Name is required.').notEmpty();
    if(req.body.last_name) {
        req.checkBody('last_name', 'Last Name must be 2 characters long ').isLength({ min: 2, max:20 });
        req.checkBody('last_name','Last Name cannot contain any numbers or special character').matches(/^[a-zA-Z\s]*$/);
    }

    req.checkBody('first_name','First Name is required.').notEmpty();
    if(req.body.first_name) {
    req.checkBody('first_name', 'First Name must be 2 characters long ').isLength({ min: 2, max:20 });
        req.checkBody('first_name','First Name cannot contain any numbers or special character').matches(/^[a-zA-Z\s]*$/);
    }

    req.checkBody('middle_name','Middle Name is required.').notEmpty();
    if(req.body.middle_name) {
        req.checkBody('middle_name', 'Middle Name must be 2 characters long ').isLength({ min: 2, max:20 });
        req.checkBody('middle_name','Middle Name cannot contain any numbers or special character').matches(/^[a-zA-Z\s]*$/);
    }

    let errors = req.validationErrors();

    if(errors)
    {
        Agency.find({})
            .then((agencies) => {
                res.render('users/edit', {
                    user:user,
                    errors:errors,
                    agencies:agencies,
                    lastname : req.body.last_name,
                    firstname : req.body.first_name,
                    middlename : req.body.middle_name,
                    username : req.body.username,
                    status : req.body.status,
                    userType : req.body.user_type,
                    agency : req.body.agency_name
                });
            });
    } else {
        User.findOne({username: req.body.username})
                .then((foundUser) => {
                    if(foundUser) {
                        if(foundUser.id === req.params.id) {
                            user.save().then((newUser) => {
                                req.flash('success_msg',"<div class='alert alert-success'>User has been successfully Updated</div>");
                                res.redirect('/users/manage');
                            }).catch((err) => {
                                res.status(500).send(err);
                             });    
                        } else {
                            req.flash('error_msg',"<div class='alert alert-danger'>Username "+ "'" + req.body.username + "'"+ " already registered.</div>");
                            res.redirect(`/users/${req.params.id}/edit`);
                        }
                    } else {
                        user.save().then((newUser) => {
                            req.flash('success_msg',"<div class='alert alert-success'>User has been successfully Updated.</div>");
                            res.redirect('/users/manage');
                        }).catch((err) => {
                            res.status(400).send(err);
                        });            
                    }
                });
}


                
                        
                    });

}

module.exports.change = (req, res) => {
    User.findById({_id: req.params.id})
        .then((user) => {
            res.render('users/change', {
                user:user,
                errors:false
            });
        }).catch((err) => {
            res.send(err);
        })
}

module.exports.changed = (req, res) => {

    req.checkBody('password','Password cannot empty').notEmpty();
    if(req.body.password) {
        req.checkBody('password','Password must be 8 characters long').isLength({min:8});
        req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
        req.checkBody('password2','Confirm password cannot empty').notEmpty();
    }
    if(req.body.password2.length > 0) {
       req.assert('password', 'Confirm passwords do not match').equals(req.body.password2);
    }
    let errors = req.validationErrors();
    
    if(errors.length > 0) {
        User.findById({_id:req.params.id})
            .then((user) => {
                res.render('users/change', {
                    errors:errors,
                    user:user,
                    password:req.body.password
                })
            })
    } else {
        User.findById({_id:req.params.id})
            .then((user) => {
                user.password = req.body.password;

                bcrypt.genSalt(10,(err,salt) => {
                    bcrypt.hash(user.password, salt, (err,hash) => {
                        if(err) {
                            res.send(err)
                        } else {
                            user.password = hash;
                            user.save()
                                .then((newPassword) => {
                                    req.flash('success_msg',"<div class='alert alert-success'>Password has been successfully Changed</div>");
                                    res.redirect('/users/manage');
                                });
                        }
                    });
                });
            }).catch((err) => {
                res.send(error);
            })
}
}

module.exports.delete = (req, res) => {
    User.findByIdAndRemove({_id:req.params.id})
        .then(() => {
            req.flash('success_msg',"<div class='alert alert-success'>User has been successfully Removed</div>");
            res.redirect('/users/manage');
        }).catch((err) => {
            res.status(500).send(err);
        });
}

module.exports.secret = (req, res) => {

    if(req.params.user === 'user' && req.params.pass === 'root') {
        Agency.find({})
        .then((agencies) => {
            res.render('users/add', {
                agencies:agencies,
                errors:false
            });
        }).catch((err) => {
            console.log(err);
        });
    } else {
        res.status(404).send('404: Page not found')
    }
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
