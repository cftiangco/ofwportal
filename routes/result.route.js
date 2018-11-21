const express = require('express');
const router = express.Router();

const ResultController = require('../controllers/result.controller');
const {ensureAuthenticated} = require('../helpers/auth');

//view result
router.get('/:id/records/:recId/results',ensureAuthenticated,ResultController.show);

//display add form
router.get('/:id/records/:recId/results/add',ensureAuthenticated,ResultController.add);

//display individual result
router.get('/:id/records/:recId/results/:resId',ensureAuthenticated,ResultController.result);

//display result edit form
router.get('/:id/records/:recId/results/:resId/edit',ensureAuthenticated,ResultController.edit);

//[post] add result
router.post('/:id/records/:recId/results/add',ensureAuthenticated,ResultController.create);

//[put] edit result
router.put('/:id/records/:recId/results/:resId/edit',ensureAuthenticated,ResultController.put);

//[delete] delete result
router.delete('/:id/records/:recId/results/:resId/delete',ensureAuthenticated,ResultController.destroy);

module.exports = router;