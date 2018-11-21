const express = require('express');
const router = express.Router();

const RecordController = require('../controllers/record.controller');
const {ensureAuthenticated} = require('../helpers/auth');
const {check} = require('express-validator/check');
const Record = require('../models/record.model');

const moment = require('moment');

router.get('/:id/records',ensureAuthenticated,RecordController.show);
router.get('/:id/records/add',ensureAuthenticated,RecordController.add);

router.get('/:id/records/:recordId/edit',ensureAuthenticated,RecordController.edit);

router.post('/:id/records/add',ensureAuthenticated,RecordController.create);

router.put('/:id/records/:recordId/edit',ensureAuthenticated,RecordController.put);

router.delete('/:id/records/:recordId/delete',ensureAuthenticated,RecordController.destroy);

module.exports = router;