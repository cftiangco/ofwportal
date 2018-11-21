const express = require('express');
const router = express.Router();

const PatientController = require('../controllers/patient.controller');

const {ensureAuthenticated} = require('../helpers/auth');

router.get('/',ensureAuthenticated, PatientController.index);

router.get('/add',ensureAuthenticated,PatientController.add);

router.get('/:id/edit',ensureAuthenticated,PatientController.edit);
router.put('/:id/edit',ensureAuthenticated,PatientController.put);

router.post('/add',ensureAuthenticated,PatientController.create);

router.delete('/delete/:id',ensureAuthenticated,PatientController.destroy);

module.exports = router;