const {
  isValidId,
  resourceNotFound,
  // duplicateFieldsHandler,
} = require('../middleware/errorHandlers');
const Record = require('../models/recordModel');
const APIQueryHandler = require('../utilities/apiQueryHandler');

exports.getAllRecords = async (req, res, next) => {
  try {
    const apiQuery = new APIQueryHandler(Record, req.query)
      .filterDocs()
      .sortDocs()
      .limitFields()
      .paginateDocs();

    const records = await apiQuery.query;

    res.status(200).json({
      status: 200,
      message: 'success',
      length: records.length,
      data: records,
    });
  } catch (error) {
    next(error);
  }
};

exports.getRecordById = async (req, res, next) => {
  try {
    isValidId(req);
    const record = await Record.findById(req.params.id);
    resourceNotFound(record, 'record', 'get');
    res.status(200).json({
      status: 200,
      message: 'success',
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

exports.addRecord = async (req, res, next) => {
  try {
    const record = new Record(req.body);
    await record.save();

    res.status(201).json({
      status: 201,
      message: 'success',
      data: record,
    });
  } catch (error) {
    // if (error.code === 11000) {
    //   return next(duplicateFieldsHandler(error.keyValue));
    // }
    next(error);
  }
};

exports.updateRecordById = async (req, res, next) => {
  try {
    isValidId(req);
    const record = await Record.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    resourceNotFound(record, 'record', 'update');
    res.status(201).json({
      status: 201,
      message: 'success',
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteAllRecords = async (req, res, next) => {
  try {
    const record = await Record.deleteMany();
    res.status(200).json({
      status: 200,
      message: 'success',
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteRecordById = async (req, res, next) => {
  try {
    isValidId(req);
    const record = await Record.findByIdAndDelete(req.params.id);
    resourceNotFound(record, 'record', 'delete');
    res.status(200).json({
      status: 200,
      message: 'success',
      data: record,
    });
  } catch (error) {
    next(error);
  }
};
