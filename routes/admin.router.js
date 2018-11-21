const express = require('express');

const router = express.Router();

const AdminController = require('../controllers/admin.controller');
const {ensureAuthenticated} = require('../helpers/auth');

router.get('/',ensureAuthenticated,AdminController.admin);

router.get('/client/add',ensureAuthenticated,AdminController.client_add);
router.post('/client/add',ensureAuthenticated,AdminController.client_create);
router.get('/client/:id/edit',ensureAuthenticated,AdminController.client_edit);
router.put('/client/:id/edit',ensureAuthenticated,AdminController.client_post);
router.delete('/client/:id/delete',ensureAuthenticated,AdminController.client_delete);

//=== country routes ===//
router.get('/country/add',ensureAuthenticated,AdminController.country_add);
router.post('/country/add',ensureAuthenticated,AdminController.country_create);
router.get('/country/:id/edit',ensureAuthenticated,AdminController.country_edit);
router.put('/country/:id/edit',ensureAuthenticated,AdminController.country_put);

module.exports = router;