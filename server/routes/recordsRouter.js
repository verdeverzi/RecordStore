const express = require('express');

const router = express.Router();

const {
  getAllRecords,
  addRecord,
  getRecordById,
  deleteRecordById,
  deleteAllRecords,
  updateRecordById,
} = require('../controllers/recordsController');

router.route('/').get(getAllRecords).post(addRecord).delete(deleteAllRecords);

router
  .route('/:id')
  .get(getRecordById)
  .delete(deleteRecordById)
  .patch(updateRecordById);

module.exports = router;
