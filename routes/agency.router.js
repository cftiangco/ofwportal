const express = require('express');
const router = express.Router();

const AgencyController = require('../controllers/agency.controller');
const {ensureAuthenticated} = require('../helpers/auth');

router.get('/',ensureAuthenticated,AgencyController.display);

router.post('/add',ensureAuthenticated,AgencyController.create);

module.exports = router;