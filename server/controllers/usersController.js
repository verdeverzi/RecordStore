const { isValidId, resourceNotFound } = require('../middleware/errorHandlers');
const User = require('../models/userModel');
const APIQueryHandler = require('../utilities/apiQueryHandler');
const { successHandler } = require('../middleware/successHandler');

exports.getAllUsers = async (req, res, next) => {
  try {
    const apiQuery = new APIQueryHandler(User, req.query)
      .filterDocs()
      .sortDocs()
      .limitFields()
      .paginateDocs();

    const users = await apiQuery.query;

    successHandler(res, 200, users);
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    isValidId(req);

    const user = await User.findById(req.params.id);
    resourceNotFound(user, 'user', 'get');

    successHandler(res, 200, user);
  } catch (error) {
    next(error);
  }
};

exports.updateUserById = async (req, res, next) => {
  try {
    isValidId(req);
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    resourceNotFound(user, 'user', 'update');
    successHandler(res, 200, user);
  } catch (error) {
    next(error);
  }
};

exports.deleteAllUsers = async (req, res, next) => {
  try {
    const info = await User.deleteMany();
    successHandler(res, 200, info);
  } catch (error) {
    next(error);
  }
};

exports.deleteUserById = async (req, res, next) => {
  try {
    isValidId(req);
    const user = await User.findByIdAndDelete(req.params.id);
    resourceNotFound(user, 'user', 'delete');
    successHandler(res, 200, { userDeleted: user.email });
  } catch (error) {
    next(error);
  }
};
