const express = require('express');
const router = express.Router();

const ClientController = require('../controllers/client.controller');
const {ensureAuthenticated} = require('../helpers/auth');

router.get('/',ensureAuthenticated,ClientController.display);

module.exports = router;