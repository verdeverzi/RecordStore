const createError = require('http-errors');
const { default: mongoose } = require('mongoose');

exports.routeNotFound = (req, res, next) => {
  res.status(404).json({
    statusCode: 404,
    status: 'fail',
    message: `Can't find http://localhost:8000${req.originalUrl}`,
  });
};

exports.duplicateFieldsHandler = (keyValue) => {
  const field = Object.keys(keyValue)[0];
  return createError(`${field} is already exist`);
};

exports.isValidId = (req) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    throw createError('The provided ID is invalid.');
};

exports.resourceNotFound = (resource, document, action) => {
  if (!resource)
    throw createError(
      404,
      `Sorry, the ${document} you are trying to ${action} doesn't seem to exist.`
    );
};

exports.authError = (message) => {
  throw createError(401, message);
};

exports.globalErrorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    statusCode: err.statusCode,
    status: err.status === 404 ? 'Fail' : 'server error',
    message: err.message,
    stack: err.stack,
  });
};
