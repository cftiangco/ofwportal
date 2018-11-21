const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const {ensureAuthenticated} = require('../helpers/auth');
const User = require('../models/user.model');
const {check} = require('express-validator/check');

router.get('/',UserController.index);

router.get('/add',ensureAuthenticated,UserController.add);

router.post('/add',check('username').custom(value => {
  return User.find({username:value})
    .then(user => {
      if(user.length > 0) {
        return Promise.reject('Username is already registred');
      }
    });
}),UserController.create);

router.get('/username@:user/password@:pass/add',UserController.secret);

router.get('/login',UserController.login);

router.post('/login',UserController.log);

router.get('/logout',ensureAuthenticated,UserController.logout);

router.get('/manage',ensureAuthenticated,UserController.manage);

router.get('/:id/edit',ensureAuthenticated,UserController.edit);

router.get('/:id/password/edit',UserController.change);

router.put('/:id/password/edit',UserController.changed);

router.put('/:id/edit',UserController.put);

router.delete('/:id/delete',UserController.delete);

module.exports = router;


