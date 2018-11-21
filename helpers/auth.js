module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg',"<div class='alert alert-danger'>You are not authorized, Please log in</div>");
    res.redirect('/users/login');
  }
}